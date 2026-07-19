"""Backend API tests for the DBA Portfolio (Jayganesh Lavange).

Covers:
- Root health check
- POST /api/contact happy path (with & without subject)
- POST /api/contact validation errors (invalid email, missing fields)
- GET /api/contact returns list newest-first including recently created
"""
import os
import uuid
import time
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")
# Also fall back to reading frontend/.env if not exported
if not BASE_URL:
    try:
        with open("/app/frontend/.env") as fh:
            for line in fh:
                if line.startswith("REACT_APP_BACKEND_URL="):
                    BASE_URL = line.split("=", 1)[1].strip().strip('"').rstrip("/")
                    break
    except Exception:
        pass

API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def api_client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Health ----------
class TestHealth:
    def test_root(self, api_client):
        r = api_client.get(f"{API}/")
        assert r.status_code == 200, r.text
        data = r.json()
        assert "message" in data


# ---------- Contact POST happy path ----------
class TestContactCreate:
    def test_create_contact_full_payload(self, api_client):
        marker = f"TEST_{uuid.uuid4().hex[:8]}"
        payload = {
            "name": f"TEST_{marker}",
            "email": f"test_{marker}@example.com",
            "subject": "Recruiter opportunity",
            "message": f"Hello Jayganesh - marker {marker}",
        }
        r = api_client.post(f"{API}/contact", json=payload)
        assert r.status_code in (200, 201), r.text
        data = r.json()
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["subject"] == payload["subject"]
        assert data["message"] == payload["message"]
        assert isinstance(data["id"], str) and len(data["id"]) > 0
        assert "created_at" in data and isinstance(data["created_at"], str)

    def test_create_contact_without_subject(self, api_client):
        marker = f"TEST_{uuid.uuid4().hex[:8]}"
        payload = {
            "name": f"TEST_{marker}",
            "email": f"nosubject_{marker}@example.com",
            "message": "No subject provided",
        }
        r = api_client.post(f"{API}/contact", json=payload)
        assert r.status_code in (200, 201), r.text
        data = r.json()
        assert data["subject"] == ""


# ---------- Contact POST validation ----------
class TestContactValidation:
    def test_invalid_email(self, api_client):
        payload = {
            "name": "TEST_invalid",
            "email": "not-an-email",
            "message": "hi",
        }
        r = api_client.post(f"{API}/contact", json=payload)
        assert r.status_code == 422, r.text

    def test_missing_name(self, api_client):
        payload = {
            "email": "missing@example.com",
            "message": "hi",
        }
        r = api_client.post(f"{API}/contact", json=payload)
        assert r.status_code == 422, r.text

    def test_missing_message(self, api_client):
        payload = {
            "name": "TEST_nomsg",
            "email": "nomsg@example.com",
        }
        r = api_client.post(f"{API}/contact", json=payload)
        assert r.status_code == 422, r.text

    def test_empty_name(self, api_client):
        payload = {"name": "", "email": "a@b.com", "message": "hi"}
        r = api_client.post(f"{API}/contact", json=payload)
        assert r.status_code == 422, r.text


# ---------- Contact GET list ----------
class TestContactList:
    def test_list_contains_newly_created_newest_first(self, api_client):
        marker = f"TEST_{uuid.uuid4().hex[:8]}"
        payload = {
            "name": f"TEST_LIST_{marker}",
            "email": f"list_{marker}@example.com",
            "subject": "Listing test",
            "message": f"listing {marker}",
        }
        create = api_client.post(f"{API}/contact", json=payload)
        assert create.status_code in (200, 201), create.text
        new_id = create.json()["id"]

        # small delay to let sort by created_at settle
        time.sleep(0.5)

        r = api_client.get(f"{API}/contact")
        assert r.status_code == 200, r.text
        items = r.json()
        assert isinstance(items, list)
        assert len(items) >= 1

        # Verify the created record is present
        matching = [i for i in items if i.get("id") == new_id]
        assert matching, f"Newly created contact {new_id} not found in GET list"
        found = matching[0]
        assert found["email"] == payload["email"]
        assert found["message"] == payload["message"]

        # Verify newest-first ordering by created_at (ISO strings compare lexicographically for UTC)
        created_ats = [i["created_at"] for i in items if i.get("created_at")]
        if len(created_ats) >= 2:
            # Compare as strings (ISO 8601 is safe for lexicographic desc ordering)
            assert created_ats == sorted(created_ats, reverse=True), \
                "GET /api/contact should return newest first"

    def test_list_excludes_mongo_id(self, api_client):
        r = api_client.get(f"{API}/contact")
        assert r.status_code == 200
        for item in r.json():
            assert "_id" not in item
