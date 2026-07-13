import { motion } from "framer-motion";
import config from "@/config/site";
import { formatDatePt } from "@/lib/utils";

export function Footer({ onSecret }: { onSecret: () => void }) {
  const { personName, partnerName, startDate, hashtag } = config.couple;

  return (
    <footer className="relative border-t border-glass/10 px-5 py-14 text-center">
      <motion.button
        onClick={onSecret}
        whileHover={{ scale: 1.3 }}
        whileTap={{ scale: 0.85 }}
        aria-label="Coração secreto"
        className="mx-auto mb-4 block text-4xl text-primary animate-heartbeat"
        title="me aperta ❤"
      >
        ❤
      </motion.button>

      <p className="font-display text-xl font-bold">
        {personName} <span className="text-primary">&</span> {partnerName}
      </p>
      <p className="mt-1 text-sm text-muted">
        Desde {formatDatePt(startDate)}
      </p>
      <p className="mx-auto mt-4 max-w-md text-muted">{config.footer.message}</p>
      {hashtag && (
        <p className="mt-4 text-xs uppercase tracking-[0.3em] text-muted/60">
          {hashtag}
        </p>
      )}
    </footer>
  );
}

export default Footer;
