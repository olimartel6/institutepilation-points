import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { X } from 'lucide-react';

export default function QRScanner({ onScan, onClose }) {
  const [error, setError] = useState(null);
  const scannerRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let scanner = null;

    const startScanner = async () => {
      try {
        scanner = new Html5Qrcode('qr-reader');
        scannerRef.current = scanner;

        await scanner.start(
          { facingMode: 'environment' },
          { fps: 10, qrbox: { width: 250, height: 250 } },
          (decodedText) => {
            scanner.stop().catch(() => {});
            onScan(decodedText);
          },
          () => {} // ignore scan failures
        );
      } catch (err) {
        setError("Impossible d'accéder à la caméra. Vérifiez les permissions.");
      }
    };

    startScanner();

    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {});
      }
    };
  }, [onScan]);

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)',
      zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
    }}>
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: 20, right: 20, width: 44, height: 44,
          borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.15)',
          color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}
      >
        <X size={22} />
      </button>

      <p style={{ color: 'white', fontSize: 16, fontWeight: 600, marginBottom: 20 }}>
        Scannez le QR du client
      </p>

      <div
        id="qr-reader"
        ref={containerRef}
        style={{ width: 300, height: 300, borderRadius: 16, overflow: 'hidden' }}
      />

      {error && (
        <p style={{ color: '#EF4444', marginTop: 16, fontSize: 14, textAlign: 'center', padding: '0 20px' }}>
          {error}
        </p>
      )}
    </div>
  );
}
