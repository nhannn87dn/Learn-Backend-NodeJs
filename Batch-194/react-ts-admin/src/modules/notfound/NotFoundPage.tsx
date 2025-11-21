import { Link } from 'react-router';
import styles from './NotFound404.module.css';

export default function NotFoundPage({ backTo = '/' }) {
  return (
    <main className={styles.wrapper} role="main">
      <div className={styles.card}>
        <div className={styles.art} aria-hidden>
          {/* Simple SVG illustration */}
          <svg viewBox="0 0 400 300" className={styles.svg} xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fillRule="evenodd">
              <rect width="400" height="300" rx="20" fill="#F4F6F8" />
              <g transform="translate(50,40)">
                <circle cx="80" cy="80" r="48" className={styles.ghostBody} />
                <ellipse cx="80" cy="115" rx="56" ry="18" className={styles.shadow} />

                <g transform="translate(40,40)" className={styles.ghostFace}>
                  <circle cx="32" cy="16" r="6" />
                  <circle cx="56" cy="16" r="6" />
                  <path d="M26 36c6 8 18 8 24 0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </g>

                <rect x="180" y="40" width="120" height="80" rx="8" className={styles.cardBox} />
                <text x="240" y="90" textAnchor="middle" fontSize="36" fontFamily="Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial">404</text>
              </g>
            </g>
          </svg>
        </div>

        <div className={styles.content}>
          <h1 className={styles.title}>Không tìm thấy trang</h1>
          <p className={styles.description}>
            Có vẻ như trang bạn tìm không tồn tại, hoặc đã bị chuyển chỗ. Hãy thử quay về trang chủ.
          </p>

          <div className={styles.controls}>
            <Link to={backTo} className={styles.primaryBtn}>
              Về trang chủ
            </Link>
            <button
              className={styles.ghostBtn}
              onClick={() => window.history.back()}
              aria-label="Quay lại"
            >
              Quay lại
            </button>
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <small>© {new Date().getFullYear()} Your Company</small>
      </footer>
    </main>
  );
}
