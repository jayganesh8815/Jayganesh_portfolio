import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Database, Server, Cloud, HardDrive } from "lucide-react";

const SNIPPETS = [
  "SELECT * FROM sys.dm_os_wait_stats;",
  "BACKUP DATABASE [Prod] TO DISK = 'P:\\bak\\prod.bak';",
  "ALTER AVAILABILITY GROUP [AG1] FAILOVER;",
  "EXEC sp_updatestats;",
  "SELECT session_id, blocking_session_id FROM sys.dm_exec_requests;",
  "CREATE NONCLUSTERED INDEX IX_Orders_Date ON Orders(OrderDate);",
  "DBCC CHECKDB('Prod') WITH NO_INFOMSGS;",
  "RESTORE DATABASE [Prod] WITH RECOVERY;",
];

const FloatIcon = ({ Icon, className, delay, anim }) => (
  <motion.div
    className={`absolute text-azure/25 ${className}`}
    animate={{ y: [0, -18, 0], rotate: [0, 4, 0] }}
    transition={{ duration: anim, repeat: Infinity, ease: "easeInOut", delay }}
  >
    <Icon strokeWidth={1} className="h-full w-full" />
  </motion.div>
);

export const SqlBackground = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 grid-faint opacity-70" />
      {/* azure radial glows */}
      <div className="absolute -left-40 top-10 h-[36rem] w-[36rem] rounded-full bg-azure/20 blur-[140px]" />
      <div className="absolute -right-32 bottom-0 h-[28rem] w-[28rem] rounded-full bg-azure-glow/10 blur-[120px]" />

      {/* floating database iconography */}
      <FloatIcon Icon={Database} className="left-[8%] top-[22%] h-16 w-16" delay={0} anim={7} />
      <FloatIcon Icon={Server} className="right-[12%] top-[18%] h-14 w-14" delay={1.2} anim={8} />
      <FloatIcon Icon={Cloud} className="left-[18%] bottom-[16%] h-20 w-20" delay={0.6} anim={9} />
      <FloatIcon Icon={HardDrive} className="right-[20%] bottom-[24%] h-12 w-12" delay={1.8} anim={6.5} />

      {/* animated SQL snippets drifting */}
      {SNIPPETS.map((s, i) => (
        <motion.span
          key={i}
          className="absolute whitespace-nowrap font-mono text-[11px] text-azure/20"
          style={{ top: `${8 + i * 11}%`, left: `${(i % 3) * 26 + 4}%` }}
          animate={{ x: [0, 40, 0], opacity: [0.1, 0.35, 0.1] }}
          transition={{ duration: 10 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
        >
          {s}
        </motion.span>
      ))}
    </div>
  );
};

export const CursorGlow = () => {
  const [pos, setPos] = useState({ x: -400, y: -400 });
  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);
  return (
    <div
      className="pointer-events-none fixed z-[2] hidden h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full lg:block"
      style={{
        left: pos.x,
        top: pos.y,
        background: "radial-gradient(circle, rgba(56,189,248,0.10), transparent 62%)",
      }}
    />
  );
};
