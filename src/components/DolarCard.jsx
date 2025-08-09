import { useEffect, useMemo, useState } from "react";
import { RefreshCw, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";
import { getDolarOficial } from "../services/dolarApi";

export default function DolarCard() {
  const [loading, setLoading] = useState(true);
  const [rate, setRate] = useState(null);
  const [updated, setUpdated] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  // Controles
  const [usd, setUsd] = useState("1");
  const [vesManual, setVesManual] = useState("");

  // Formatos
  const fmtVES = new Intl.NumberFormat("es-VE", { style: "currency", currency: "VES", minimumFractionDigits: 2 });
  const fmtUSD = new Intl.NumberFormat("es-VE", { style: "currency", currency: "USD", minimumFractionDigits: 2 });

  const vesAuto = useMemo(() => {
    if (!rate) return "";
    const n = parseFloat(usd || "0") * rate;
    return isFinite(n) ? n.toFixed(2) : "";
  }, [usd, rate]);

  async function fetchRate() {
    setLoading(true);
    setError("");
    try {
      const d = await getDolarOficial();
      setRate(d.promedio);
      setUpdated(new Date(d.fechaActualizacion).toLocaleString());
    } catch {
      setError("No se pudo obtener la tasa BCV. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchRate(); }, []);

  const onUsdChange = (e) => {
    const v = e.target.value.replace(",", ".");
    if (/^\d*([.]\d{0,2})?$/.test(v) || v === "") {
      setUsd(v);
      setVesManual("");
    }
  };

  const onVesChange = (e) => {
    const v = e.target.value.replace(",", ".");
    if (/^\d*([.]\d{0,2})?$/.test(v) || v === "") {
      setVesManual(v);
      if (rate) setUsd(((parseFloat(v || "0") / rate) || 0).toFixed(2));
    }
  };

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(rate?.toFixed(2) ?? "");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Error al copiar la tasa:", err);
    }
  };

  return (
    <motion.div
      className="
        w-full mx-auto max-w-2xl
        rounded-2xl border bg-white
        border-zinc-200 shadow-xl
        p-6 sm:p-7 text-zinc-900
      "
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Encabezado */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">Dólar Oficial (BCV)</h2>
          <p className="text-sm text-zinc-500">
            {loading ? "Cargando…" : `Actualizado: ${updated}`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchRate}
            className="inline-flex items-center justify-center h-9 w-9 rounded-lg border border-zinc-200 hover:bg-zinc-50 transition"
            title="Refrescar"
          >
            <RefreshCw size={16} />
          </button>
          <button
            onClick={onCopy}
            className="inline-flex items-center gap-2 h-9 px-3 rounded-lg border border-emerald-300 text-emerald-700 hover:bg-emerald-50 transition"
            title="Copiar tasa"
            disabled={!rate}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            <span className="hidden sm:inline text-sm">{copied ? "Copiado" : "Copiar"}</span>
          </button>
        </div>
      </div>

      {/* Valor principal */}
      <div className="mt-4 mb-6">
        {loading ? (
          <div className="h-10 w-48 rounded-lg bg-zinc-200 animate-pulse" />
        ) : error ? (
          <p className="text-rose-600 font-medium">{error}</p>
        ) : (
          <div className="text-4xl sm:text-5xl font-extrabold select-all text-emerald-600">
            Bs. {rate?.toFixed(2)}
          </div>
        )}
      </div>

      {/* Conversores */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* USD -> VES */}
        <div className="p-4 rounded-xl border border-zinc-200 bg-white">
          <label className="text-sm font-medium text-zinc-700">USD → VES</label>
          {loading ? (
            <div className="mt-2 h-10 rounded-lg bg-zinc-200 animate-pulse" />
          ) : (
            <>
              <input
                className="mt-2 w-full rounded-lg border px-3 py-2 bg-white
                           border-zinc-300 outline-none
                           focus:ring-2 focus:ring-emerald-400/60"
                type="text"
                inputMode="decimal"
                value={usd}
                onChange={onUsdChange}
                placeholder="Monto en USD"
                onWheel={(e) => e.currentTarget.blur()}
              />
              <div className="mt-2 text-lg font-semibold text-emerald-600">
                ≈ {vesAuto ? fmtVES.format(+vesAuto) : fmtVES.format(0)}
              </div>
            </>
          )}
        </div>

        {/* VES -> USD */}
        <div className="p-4 rounded-xl border border-zinc-200 bg-white">
          <label className="text-sm font-medium text-zinc-700">VES → USD</label>
          {loading ? (
            <div className="mt-2 h-10 rounded-lg bg-zinc-200 animate-pulse" />
          ) : (
            <>
              <input
                className="mt-2 w-full rounded-lg border px-3 py-2 bg-white
                           border-zinc-300 outline-none
                           focus:ring-2 focus:ring-emerald-400/60"
                type="text"
                inputMode="decimal"
                value={vesManual}
                onChange={onVesChange}
                placeholder="Monto en VES"
                onWheel={(e) => e.currentTarget.blur()}
              />
              <div className="mt-2 text-lg font-semibold text-emerald-600">
                ≈ {fmtUSD.format(parseFloat(usd || "0"))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Fuente */}
      <p className="mt-4 text-xs text-zinc-500">
        Fuente: tipo de cambio oficial BCV (vía DolarApi).
      </p>
    </motion.div>
  );
}
