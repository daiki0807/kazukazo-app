import { useState } from "react";

const ITEMS = [
  { id: "apple",  emoji: "🍎", label: "りんご" },
  { id: "ball",   emoji: "🎾", label: "ボール" },
  { id: "pencil", emoji: "✏️", label: "えんぴつ" },
  { id: "tomato", emoji: "🍅", label: "トマト" },
  { id: "clock",  emoji: "🕐", label: "とけい" },
  { id: "egg",    emoji: "🥚", label: "たまご" },
];

const MAX = 20;
const MIN = 0;

export default function App() {
  const [selected, setSelected] = useState(ITEMS[0]);
  const [count, setCount] = useState(0);

  const increment = () => setCount(c => Math.min(c + 1, MAX));
  const decrement = () => setCount(c => Math.max(c - 1, MIN));
  const reset = () => setCount(0);

  const handleSelect = (item) => {
    setSelected(item);
    setCount(0);
  };

  return (
    <div style={styles.root}>
      {/* タイトル */}
      <h1 style={styles.title}>かずかぞえアプリ</h1>

      {/* 素材選択 */}
      <div style={styles.selectorRow}>
        {ITEMS.map(item => (
          <button
            key={item.id}
            onClick={() => handleSelect(item)}
            style={{
              ...styles.selectorBtn,
              ...(selected.id === item.id ? styles.selectorBtnActive : {}),
            }}
          >
            <span style={styles.selectorEmoji}>{item.emoji}</span>
            <span style={styles.selectorLabel}>{item.label}</span>
          </button>
        ))}
      </div>

      {/* 絵文字表示エリア */}
      <div style={styles.displayArea}>
        {count === 0 ? (
          <span style={styles.emptyMsg}>＋ボタンをおしてね</span>
        ) : (
          <div style={styles.emojiGrid}>
            {Array.from({ length: count }).map((_, i) => (
              <span
                key={i}
                style={{
                  ...styles.emojiItem,
                  animationDelay: `${i * 0.03}s`,
                }}
              >
                {selected.emoji}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 数字 */}
      <div style={styles.countBox}>
        <span style={styles.countNum}>{count}</span>
        <span style={styles.countUnit}>こ</span>
      </div>

      {/* 増減ボタン */}
      <div style={styles.btnRow}>
        <button
          onClick={decrement}
          disabled={count <= MIN}
          style={{
            ...styles.ctrlBtn,
            ...styles.minusBtn,
            ...(count <= MIN ? styles.btnDisabled : {}),
          }}
        >
          −
        </button>
        <button
          onClick={increment}
          disabled={count >= MAX}
          style={{
            ...styles.ctrlBtn,
            ...styles.plusBtn,
            ...(count >= MAX ? styles.btnDisabled : {}),
          }}
        >
          ＋
        </button>
      </div>

      {/* MAX表示 */}
      {count >= MAX && (
        <p style={styles.maxMsg}>さいだいは {MAX} こだよ！</p>
      )}

      {/* リセット */}
      <button onClick={reset} style={styles.resetBtn}>
        リセット
      </button>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Kaisei+Decol:wght@400;700&display=swap');
        @keyframes popIn {
          0%   { transform: scale(0.4); opacity: 0; }
          70%  { transform: scale(1.2); }
          100% { transform: scale(1);   opacity: 1; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  root: {
    minHeight: "100vh",
    background: "linear-gradient(160deg, #fff9e6 0%, #fff0f5 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "24px 16px 40px",
    fontFamily: "'Kaisei Decol', serif",
    boxSizing: "border-box",
  },
  title: {
    fontSize: "clamp(20px, 5vw, 32px)",
    color: "#e07040",
    margin: "0 0 20px",
    letterSpacing: "0.08em",
    textShadow: "2px 2px 0 #ffd6a0",
  },

  /* 素材選択 */
  selectorRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    justifyContent: "center",
    marginBottom: "20px",
  },
  selectorBtn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
    padding: "10px 14px",
    border: "3px solid #f0c080",
    borderRadius: "16px",
    background: "#fffdf5",
    cursor: "pointer",
    transition: "all 0.15s",
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
  },
  selectorBtnActive: {
    background: "#ffe8b0",
    borderColor: "#e07040",
    transform: "scale(1.08)",
    boxShadow: "0 4px 12px rgba(224,112,64,0.25)",
  },
  selectorEmoji: {
    fontSize: "clamp(24px, 6vw, 36px)",
  },
  selectorLabel: {
    fontSize: "clamp(10px, 2.5vw, 13px)",
    color: "#7a5030",
    fontWeight: "700",
  },

  /* 絵文字エリア */
  displayArea: {
    width: "100%",
    maxWidth: "540px",
    minHeight: "180px",
    background: "rgba(255,255,255,0.75)",
    border: "3px dashed #f0c080",
    borderRadius: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "16px",
    boxSizing: "border-box",
    marginBottom: "16px",
  },
  emptyMsg: {
    color: "#c0a070",
    fontSize: "clamp(14px, 3.5vw, 18px)",
  },
  emojiGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    justifyContent: "center",
    alignItems: "center",
  },
  emojiItem: {
    fontSize: "clamp(28px, 7vw, 44px)",
    animation: "popIn 0.25s ease both",
    display: "inline-block",
    lineHeight: 1,
  },

  /* カウント表示 */
  countBox: {
    display: "flex",
    alignItems: "baseline",
    gap: "6px",
    marginBottom: "20px",
  },
  countNum: {
    fontSize: "clamp(56px, 14vw, 96px)",
    fontWeight: "700",
    color: "#e07040",
    lineHeight: 1,
    textShadow: "3px 3px 0 #ffd6a0",
  },
  countUnit: {
    fontSize: "clamp(22px, 5vw, 36px)",
    color: "#c05820",
    fontWeight: "700",
  },

  /* 増減ボタン */
  btnRow: {
    display: "flex",
    gap: "24px",
    marginBottom: "12px",
  },
  ctrlBtn: {
    width: "clamp(72px, 18vw, 100px)",
    height: "clamp(72px, 18vw, 100px)",
    borderRadius: "50%",
    border: "none",
    fontSize: "clamp(32px, 8vw, 52px)",
    fontWeight: "700",
    cursor: "pointer",
    transition: "transform 0.1s, box-shadow 0.1s",
    lineHeight: 1,
    boxShadow: "0 6px 0 rgba(0,0,0,0.15)",
  },
  minusBtn: {
    background: "linear-gradient(145deg, #ff8070, #e04030)",
    color: "#fff",
  },
  plusBtn: {
    background: "linear-gradient(145deg, #60d080, #30a050)",
    color: "#fff",
  },
  btnDisabled: {
    opacity: 0.35,
    cursor: "not-allowed",
    transform: "none",
    boxShadow: "none",
  },

  /* MAX メッセージ */
  maxMsg: {
    color: "#e07040",
    fontWeight: "700",
    fontSize: "clamp(14px, 3.5vw, 18px)",
    margin: "0 0 8px",
    animation: "fadeUp 0.3s ease",
  },

  /* リセット */
  resetBtn: {
    marginTop: "12px",
    padding: "10px 32px",
    borderRadius: "30px",
    border: "3px solid #c0a070",
    background: "#fffdf5",
    color: "#a07040",
    fontSize: "clamp(14px, 3.5vw, 18px)",
    fontWeight: "700",
    cursor: "pointer",
    letterSpacing: "0.1em",
    transition: "background 0.15s",
  },
};
