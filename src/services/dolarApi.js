export async function getDolarOficial() {
  const res = await fetch('https://ve.dolarapi.com/v1/dolares/oficial');
  if (!res.ok) throw new Error('No se pudo obtener la tasa BCV');
  return res.json();
}
