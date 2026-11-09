// Poori site ke peeche halka sa moving glow + film grain
export default function Aurora() {
  return (
    <>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="aurora-blob aurora-a" />
        <div className="aurora-blob aurora-b" />
      </div>
      <div aria-hidden="true" className="grain-overlay" />
    </>
  );
}
