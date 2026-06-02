import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { playSound } from './utils/sound';
import { materiSlides } from './data/quizData';
import {
  getAdminSettings,
  getCustomQuestions,
  getUserIdentityConfig,
  addLeaderboardEntry,
  getLeaderboard,
  getMergedQuestions,
  initGlobalStore,
} from './data/adminStore';

// ReactBits Components
import ParticlesBackground from './components/ReactBits/ParticlesBackground';
import SplitText from './components/ReactBits/SplitText';
import BlurText from './components/ReactBits/BlurText';
import TiltedCard from './components/ReactBits/TiltedCard';
import ShinyText from './components/ReactBits/ShinyText';

// Quiz Components
import ConfirmModal from './components/Quiz/ConfirmModal';
import TokenSelector from './components/Quiz/TokenSelector';
import DragDropScramble from './components/Quiz/DragDropScramble';
import DragDropSPO from './components/Quiz/DragDropSPO';
import SandboxQuiz from './components/Quiz/SandboxQuiz';
import UserIdentityForm from './components/Quiz/UserIdentityForm';

// Admin Components
import AdminLogin from './components/Admin/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard';

const highlightExplanation = (text) => {
  if (!text) return '';
  let highlighted = text;
  
  // Highlight subjek (yellowish/orange)
  highlighted = highlighted.replace(/(subjek|Subjek)/g, '<strong class="highlight-s-text">$1</strong>');
  highlighted = highlighted.replace(/\(S\)/g, '(<strong class="highlight-s-text">S</strong>)');
  highlighted = highlighted.replace(/\bS\b:/g, '<strong class="highlight-s-text">S</strong>:');
  
  // Highlight predikat (green)
  highlighted = highlighted.replace(/(predikat|Predikat)/g, '<strong class="highlight-p-text">$1</strong>');
  highlighted = highlighted.replace(/\(P\)/g, '(<strong class="highlight-p-text">P</strong>)');
  highlighted = highlighted.replace(/\bP\b:/g, '<strong class="highlight-p-text">P</strong>:');
  
  // Highlight objek (blue)
  highlighted = highlighted.replace(/(objek|Objek)/g, '<strong class="highlight-o-text">$1</strong>');
  highlighted = highlighted.replace(/\(O\)/g, '(<strong class="highlight-o-text">O</strong>)');
  highlighted = highlighted.replace(/\bO\b:/g, '<strong class="highlight-o-text">O</strong>:');
  
  return highlighted;
};

export default function App() {
  // Route state
  const [route, setRoute] = useState('app'); // 'app' | 'admin'
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  // App States
  const [currentScreen, setCurrentScreen] = useState('cover');
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [currentMateri, setCurrentMateri] = useState(0);
  const [isGlobalLoading, setIsGlobalLoading] = useState(true);

  // Initialize Global Store
  useEffect(() => {
    initGlobalStore().then(() => {
      setIsGlobalLoading(false);
    });
  }, []);
  
  // Quiz States
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [usedSandboxSentences, setUsedSandboxSentences] = useState([]);
  const [feedback, setFeedback] = useState({ show: false, correct: false, explain: '', answerStr: '' });
  const hasAnsweredRef = useRef(false);
  
  // User Identity
  const [userIdentity, setUserIdentity] = useState(null);
  
  // Modals & Timeouts
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Hash-based routing
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#/admin') {
        setRoute('admin');
      } else {
        setRoute('app');
        setAdminLoggedIn(false);
      }
    };
    
    handleHashChange(); // Check on mount
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Sound toggle helper
  const handleToggleSound = () => {
    const nextSound = !isSoundEnabled;
    setIsSoundEnabled(nextSound);
    playSound('click', nextSound);
  };

  // Nav helpers with click sound
  const navigateTo = (screen) => {
    playSound('click', isSoundEnabled);
    setCurrentScreen(screen);
    if (screen === 'materi') {
      setCurrentMateri(0);
    } else if (screen === 'quiz') {
      // Show identity form first if fields are enabled
      const idConfig = getUserIdentityConfig();
      const hasEnabledFields = idConfig.enabled !== false && idConfig.fields.some((f) => f.enabled === true || f.enabled === 'true');
      if (hasEnabledFields && !userIdentity) {
        setCurrentScreen('identity');
      } else {
        setCurrentScreen('quiz-instructions');
      }
    }
  };

  // Handle identity submission
  const handleIdentitySubmit = (data) => {
    setUserIdentity(data);
    setCurrentScreen('quiz-instructions');
  };

  const handleIdentitySkip = () => {
    setUserIdentity({ name: '', class: '', studentId: '' });
    setCurrentScreen('quiz-instructions');
  };

  const startActualQuiz = () => {
    playSound('click', isSoundEnabled);
    setCurrentScreen('quiz');
    initQuiz();
  };

  // Initialize Quiz with admin settings
  const initQuiz = () => {
    const settings = getAdminSettings();
    const customQs = getCustomQuestions();
    const mergedQuestions = getMergedQuestions();

    // Build question pool based on mode
    let pool = [];
    const standardPool = mergedQuestions.filter(q => q.type !== 'sandbox');

    switch (settings.quizMode) {
      case 'sequential':
        pool = [...standardPool, ...customQs];
        break;
      case 'custom_only':
        pool = [...customQs];
        break;
      case 'mixed':
        pool = [...standardPool, ...customQs];
        // Shuffle for mixed mode
        pool.sort(() => Math.random() - 0.5);
        break;
      case 'random':
      default:
        pool = [...standardPool, ...customQs].sort(() => Math.random() - 0.5);
        break;
    }

    // Take the configured number of questions
    const count = settings.useAllQuestions ? pool.length : Math.min(settings.questionCount, pool.length);
    let selected = pool.slice(0, count);

    // Optionally append sandbox questions
    if (settings.includeSandbox) {
      const sandboxQs = mergedQuestions.filter(q => q.type === 'sandbox');
      if (sandboxQs.length > 0) {
        selected = [...selected, ...sandboxQs];
      }
    }

    // Fallback: if no questions available, use defaults
    if (selected.length === 0) {
      const defaultPool = [...standardPool].sort(() => Math.random() - 0.5).slice(0, 9);
      const sandboxQs = mergedQuestions.filter(q => q.type === 'sandbox');
      selected = sandboxQs.length > 0 ? [...defaultPool, ...sandboxQs] : defaultPool;
    }

    setQuizQuestions(selected);
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswers([]);
    setUsedSandboxSentences([]);
    setFeedback({ show: false, correct: false, explain: '', answerStr: '' });
    hasAnsweredRef.current = false;
  };

  // Check answers based on question types
  const handleCheckAnswer = (answer, explanationText = null, meta = null) => {
    if (hasAnsweredRef.current) return;
    hasAnsweredRef.current = true;

    const q = quizQuestions[currentQuestionIndex];
    let isCorrect = false;
    let computedExplain = explanationText || q.explain;
    let rightAnswerStr = '';

    if (q.type === 'token') {
      isCorrect = answer; // TokenSelector returns boolean correctness
      if (!isCorrect) {
        rightAnswerStr = `Jawaban yang benar: ${q.answer}`;
      }
    } else if (q.type === 'scramble') {
      isCorrect = answer.every((w, idx) => w === q.answer[idx]);
      if (!isCorrect) {
        rightAnswerStr = `Susunan yang benar: ${q.answer.join(' ')}`;
      }
    } else if (q.type === 'drag') {
      isCorrect =
        answer.S === q.answer.S &&
        answer.P === q.answer.P &&
        answer.O === q.answer.O;
      if (!isCorrect) {
        rightAnswerStr = `Susunan yang benar: S = ${q.answer.S}, P = ${q.answer.P}, O = ${q.answer.O}`;
      }
    } else if (q.type === 'sandbox') {
      isCorrect = answer; // SandboxQuiz now returns true/false based on SPO order check
      if (isCorrect && meta && meta.sentence) {
        setUsedSandboxSentences((prev) => [...prev, meta.sentence]);
      }
    }

    if (isCorrect) {
      setScore((s) => s + 1);
    }
    
    setAnswers((prev) => [...prev, { question: q, correct: isCorrect }]);
    playSound(isCorrect ? 'correct' : 'wrong', isSoundEnabled);

    // Show feedback popup
    setFeedback({
      show: true,
      correct: isCorrect,
      explain: highlightExplanation(computedExplain),
      answerStr: rightAnswerStr
    });
  };

  const handleDismissFeedback = () => {
    if (!hasAnsweredRef.current) return;
    hasAnsweredRef.current = false;

    setFeedback((f) => ({ ...f, show: false }));
    
    // Go to next question or show results
    const nextIdx = currentQuestionIndex + 1;
    if (nextIdx < quizQuestions.length) {
      setCurrentQuestionIndex(nextIdx);
    } else {
      // Finished all questions - go to results
      const finalScore = score;
      
      // Save to leaderboard
      const settings = getAdminSettings();
      if (settings.showLeaderboard) {
        addLeaderboardEntry({
          name: userIdentity?.name || 'Anonim',
          class: userIdentity?.class || '',
          studentId: userIdentity?.studentId || '',
          score: finalScore,
          total: quizQuestions.length,
        });
      }

      setCurrentScreen('hasil');
      
      // Celebrate with sound & confetti
      const isPass = finalScore >= quizQuestions.length * 0.6;
      if (isPass) {
        playSound('victory', isSoundEnabled);
        // Confetti burst
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 }
        });
        // Extra fireworks effect
        let end = Date.now() + (2 * 1000);
        (function frame() {
          confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
          });
          confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
          });
          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        }());
      } else {
        playSound('wrong', isSoundEnabled);
      }
    }
  };

  // Materials Nav helpers
  const handleNextMateri = () => {
    playSound('click', isSoundEnabled);
    if (currentMateri < materiSlides.length - 1) {
      setCurrentMateri(currentMateri + 1);
    } else {
      navigateTo('quiz');
    }
  };

  const handlePrevMateri = () => {
    playSound('click', isSoundEnabled);
    if (currentMateri > 0) {
      setCurrentMateri(currentMateri - 1);
    }
  };

  // Confirm exiting quiz mid-way
  const handleConfirmExit = () => {
    setShowConfirmModal(false);
    setUserIdentity(null);
    navigateTo('menu');
  };

  // ===== ADMIN ROUTE =====
  if (route === 'admin') {
    if (!adminLoggedIn) {
      return <AdminLogin onLogin={() => setAdminLoggedIn(true)} />;
    }
    return (
      <AdminDashboard
        onLogout={() => {
          setAdminLoggedIn(false);
          window.location.hash = '';
        }}
      />
    );
  }

  // ===== USER APP =====

  // Get leaderboard for results
  const currentLeaderboard = getLeaderboard();
  const adminSettings = getAdminSettings();

  if (isGlobalLoading) {
    return (
      <div className="app-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--blue-50)' }}>
        <h2 style={{ color: 'var(--blue-600)', marginBottom: 20 }}>🔄 Menghubungkan ke Server...</h2>
        <div className="spinner" style={{ width: 40, height: 40, border: '4px solid rgba(0,0,0,0.1)', borderTopColor: 'var(--blue-500)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Floating Sound Toggle Button (Only on screens without sticky headers) */}
      {(currentScreen === 'cover' || currentScreen === 'identity' || currentScreen === 'hasil') && (
        <button
          id="btn-sound-toggle"
          className={`btn-sound-floating ${!isSoundEnabled ? 'muted' : ''}`}
          onClick={handleToggleSound}
          aria-label="Toggle Sound"
        >
          {isSoundEnabled ? '🔊' : '🔇'}
        </button>
      )}

      {/* Screens Router */}
      <AnimatePresence>
        
        {/* ===== COVER SCREEN ===== */}
        {currentScreen === 'cover' && (
          <motion.div
            key="cover"
            className="screen active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="cover-bg">
              <img src="/images/image1.jpeg" alt="background hutan" className="cover-bg-img" />
            </div>
            <ParticlesBackground />
            <div className="cover-content">
              <div className="cover-title-wrap">
                <div className="cover-badge">✨ Bahasa Indonesia</div>
                <h1 className="cover-title">
                  <SplitText text="Detektif Kalimat" delay={0.1} stagger={0.06} />
                </h1>
                <p className="cover-subtitle">
                  <BlurText text="Belajar Kalimat SPO dengan Seru!" delay={0.6} />
                </p>
              </div>
              <div className="cover-characters">
                <img src="/images/image2.png" alt="Detektif perempuan" className="char char-left bounce-anim" />
                <img src="/images/image3.png" alt="Detektif laki-laki" className="char char-right bounce-anim delay-1" />
              </div>
              <div className="cover-buttons">
                <button className="btn-main" onClick={() => navigateTo('menu')}>
                  📚 <ShinyText text="Mulai Belajar!" speed="3s" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ===== MENU SCREEN ===== */}
        {currentScreen === 'menu' && (
          <motion.div
            key="menu"
            className="screen active"
            style={{
              background: "url('/images/image7.jpeg') no-repeat center center",
              backgroundSize: 'cover'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <ParticlesBackground count={30} color="#5c3317" />
            <div className="menu-content">
              <div className="header" style={{ width: '100%', background: 'rgba(255,255,255,0.9)', borderRadius: '16px' }}>
                <button className="btn-back" onClick={() => navigateTo('cover')}>← Kembali</button>
                <h2 className="page-title">📋 Menu Utama</h2>
                <button
                  className={`btn-sound-header ${!isSoundEnabled ? 'muted' : ''}`}
                  onClick={handleToggleSound}
                  aria-label="Toggle Sound"
                >
                  {isSoundEnabled ? '🔊' : '🔇'}
                </button>
              </div>
              
              <div className="menu-body-wrapper">
                <img src="/images/image2.png" alt="Detektif" className="menu-char float-anim" />
                
                <div className="menu-cards">
                  <TiltedCard className="menu-card-tilt" onClick={() => navigateTo('materi')}>
                    <div className="menu-card card-materi">
                      <div className="menu-card-icon">📖</div>
                      <h3>Materi</h3>
                      <p>Pelajari Kalimat SPO</p>
                      <span className="menu-card-arrow">→</span>
                    </div>
                  </TiltedCard>

                  <TiltedCard className="menu-card-tilt" onClick={() => navigateTo('quiz')}>
                    <div className="menu-card card-latihan">
                      <div className="menu-card-icon">🎯</div>
                      <h3>Latihan</h3>
                      <p>Uji Kemampuanmu!</p>
                      <span className="menu-card-arrow">→</span>
                    </div>
                  </TiltedCard>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ===== IDENTITY SCREEN ===== */}
        {currentScreen === 'identity' && (
          <motion.div
            key="identity"
            className="screen active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <UserIdentityForm
              config={getUserIdentityConfig()}
              onSubmit={handleIdentitySubmit}
              onSkip={handleIdentitySkip}
            />
          </motion.div>
        )}

        {/* ===== QUIZ INSTRUCTIONS SCREEN ===== */}
        {currentScreen === 'quiz-instructions' && (
          <motion.div
            key="quiz-instructions"
            className="screen active"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="header">
              <button className="btn-back" onClick={() => navigateTo('menu')}>← Menu</button>
              <h2 className="page-title">📝 Petunjuk Latihan</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  className={`btn-sound-header ${!isSoundEnabled ? 'muted' : ''}`}
                  onClick={handleToggleSound}
                  aria-label="Toggle Sound"
                >
                  {isSoundEnabled ? '🔊' : '🔇'}
                </button>
              </div>
            </div>

            <div className="quiz-body" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 120px)' }}>
              <div className="quiz-card bg-slide-quiz-intro" style={{ maxWidth: '500px', margin: '20px auto', width: '90%' }}>
                <div className="materi-slide-glass-overlay" style={{ padding: '28px' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '14px', textAlign: 'center', animation: 'floatAnim 3s ease-in-out infinite' }}>🕵️‍♂️🔍</div>
                  <h3 style={{ fontFamily: 'Fredoka', color: 'var(--brown-dark)', fontSize: '1.6rem', textAlign: 'center', marginBottom: '20px', fontWeight: '800' }}>
                    Siap Memulai Misi Latihan?
                  </h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'left', marginBottom: '28px' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'start' }}>
                      <span style={{ fontSize: '1.4rem' }}>👆</span>
                      <p style={{ margin: 0, fontSize: '0.95rem', color: '#5c3317', fontFamily: 'Nunito', lineHeight: '1.4' }}>
                        <strong>Pilih Kata:</strong> Klik kata di kalimat yang merupakan Subjek (S), Predikat (P), atau Objek (O).
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'start' }}>
                      <span style={{ fontSize: '1.4rem' }}>📦</span>
                      <p style={{ margin: 0, fontSize: '0.95rem', color: '#5c3317', fontFamily: 'Nunito', lineHeight: '1.4' }}>
                        <strong>Geser & Kelompokkan:</strong> Tarik kata ke kotak S, P, atau O yang benar.
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'start' }}>
                      <span style={{ fontSize: '1.4rem' }}>🔀</span>
                      <p style={{ margin: 0, fontSize: '0.95rem', color: '#5c3317', fontFamily: 'Nunito', lineHeight: '1.4' }}>
                        <strong>Susun Kalimat:</strong> Urutkan kata acak agar membentuk susunan SPO yang benar.
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'start' }}>
                      <span style={{ fontSize: '1.4rem' }}>💡</span>
                      <p style={{ margin: 0, fontSize: '0.95rem', color: '#5c3317', fontFamily: 'Nunito', lineHeight: '1.4' }}>
                        <strong>Petunjuk (Hint):</strong> Klik ikon bohlam jika kamu butuh bantuan detektif!
                      </p>
                    </div>
                  </div>

                  <button className="btn-main" style={{ width: '100%', padding: '16px 20px', fontSize: '1.2rem', fontFamily: 'Fredoka' }} onClick={startActualQuiz}>
                    🚀 Mulai Misi Latihan!
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ===== MATERI SCREEN ===== */}
        {currentScreen === 'materi' && (
          <motion.div
            key="materi"
            className="screen active"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.35 }}
          >
            <div className="header">
              <button className="btn-back" onClick={() => navigateTo('menu')}>← Menu</button>
              <h2 className="page-title">📖 Materi</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className="slide-counter">{currentMateri + 1} / {materiSlides.length}</div>
                <button
                  className={`btn-sound-header ${!isSoundEnabled ? 'muted' : ''}`}
                  onClick={handleToggleSound}
                  aria-label="Toggle Sound"
                >
                  {isSoundEnabled ? '🔊' : '🔇'}
                </button>
              </div>
            </div>

            <div className="materi-content">
              <motion.div
                key={currentMateri}
                className={`materi-slide ${materiSlides[currentMateri].bgClass || ''}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="materi-slide-glass-overlay">
                  <div className="materi-slide-header">
                    <span className="slide-emoji">{materiSlides[currentMateri].emoji}</span>
                    <h2>{materiSlides[currentMateri].title}</h2>
                    <p>{materiSlides[currentMateri].desc}</p>
                  </div>
                  {materiSlides[currentMateri].content}
                </div>
              </motion.div>
            </div>

            <div className="materi-nav">
              <button
                className="btn-nav"
                onClick={handlePrevMateri}
                disabled={currentMateri === 0}
              >
                ◀ Sebelumnya
              </button>
              
              <div className="materi-dots">
                {materiSlides.map((_, i) => (
                  <div
                    key={i}
                    className={`materi-dot ${i === currentMateri ? 'active' : ''}`}
                    onClick={() => {
                      playSound('click', isSoundEnabled);
                      setCurrentMateri(i);
                    }}
                  />
                ))}
              </div>

              <button
                className="btn-nav btn-nav-next"
                onClick={handleNextMateri}
              >
                {currentMateri === materiSlides.length - 1 ? '🎯 Latihan!' : 'Selanjutnya ▶'}
              </button>
            </div>
          </motion.div>
        )}

        {/* ===== QUIZ SCREEN ===== */}
        {currentScreen === 'quiz' && quizQuestions.length > 0 && (
          <motion.div
            key="quiz"
            className="screen active"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="header">
              <button className="btn-back" onClick={() => setShowConfirmModal(true)}>← Menu</button>
              <h2 className="page-title">🎯 Latihan</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div className="quiz-progress-wrap">
                  <span className="quiz-progress-text">
                    {currentQuestionIndex + 1}/{quizQuestions.length}
                  </span>
                  <div className="quiz-progress-bar">
                    <div
                      className="quiz-progress-fill"
                      style={{ width: `${(currentQuestionIndex / quizQuestions.length) * 100}%` }}
                    />
                  </div>
                </div>
                <button
                  className={`btn-sound-header ${!isSoundEnabled ? 'muted' : ''}`}
                  onClick={handleToggleSound}
                  aria-label="Toggle Sound"
                >
                  {isSoundEnabled ? '🔊' : '🔇'}
                </button>
              </div>
            </div>

            <div className="quiz-body">
              <div className={`quiz-card ${quizQuestions[currentQuestionIndex].type === 'sandbox' ? 'bg-slide-intro' : 'bg-slide-quiz-intro'}`}>
                <div className="materi-slide-glass-overlay">
                  <div className="quiz-num">Soal {currentQuestionIndex + 1} dari {quizQuestions.length}</div>
                  <h3 className="quiz-question">{quizQuestions[currentQuestionIndex].question}</h3>

                  {/* Show sentence box ONLY for question types that need the full sentence displayed */}
                  {quizQuestions[currentQuestionIndex].sentence &&
                   quizQuestions[currentQuestionIndex].type !== 'token' &&
                   quizQuestions[currentQuestionIndex].type !== 'scramble' &&
                   quizQuestions[currentQuestionIndex].type !== 'drag' && (
                    <div className="quiz-sentence-box">
                      <div className="quiz-sentence">"{quizQuestions[currentQuestionIndex].sentence}"</div>
                    </div>
                  )}

                  {/* Render based on Question Type */}
                  {quizQuestions[currentQuestionIndex].type === 'token' && (
                    <TokenSelector
                      key={quizQuestions[currentQuestionIndex].id}
                      q={quizQuestions[currentQuestionIndex]}
                      onCheck={(correct, selection) => handleCheckAnswer(correct)}
                    />
                  )}

                  {quizQuestions[currentQuestionIndex].type === 'scramble' && (
                    <DragDropScramble
                      key={quizQuestions[currentQuestionIndex].id}
                      q={quizQuestions[currentQuestionIndex]}
                      onCheck={(ans) => handleCheckAnswer(ans)}
                      isSoundEnabled={isSoundEnabled}
                    />
                  )}

                  {quizQuestions[currentQuestionIndex].type === 'drag' && (
                    <DragDropSPO
                      key={quizQuestions[currentQuestionIndex].id}
                      q={quizQuestions[currentQuestionIndex]}
                      onCheck={(ans) => handleCheckAnswer(ans)}
                    />
                  )}

                  {quizQuestions[currentQuestionIndex].type === 'sandbox' && (
                    <SandboxQuiz
                      key={quizQuestions[currentQuestionIndex].id}
                      q={quizQuestions[currentQuestionIndex]}
                      usedSentences={usedSandboxSentences}
                      onCheck={(correct, explain, meta) => handleCheckAnswer(correct, explain, meta)}
                    />
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ===== HASIL SCREEN ===== */}
        {currentScreen === 'hasil' && (
          <motion.div
            key="hasil"
            className="screen active"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div className="hasil-content">
              <img src="/images/image3.png" alt="Detektif" className="hasil-char" />
              
              <div className="hasil-card">
                <h2 className="hasil-title">
                  {score === quizQuestions.length
                    ? '🏆 Sempurna!'
                    : score >= quizQuestions.length * 0.7
                    ? '🎉 Bagus Sekali!'
                    : '💪 Ayo Coba Lagi!'}
                </h2>
                <p className="hasil-subtitle">
                  {score === quizQuestions.length
                    ? 'Kamu Detektif Kalimat Sejati!'
                    : score >= quizQuestions.length * 0.7
                    ? 'Kamu hampir jadi detektif handal!'
                    : 'Belajar lagi, kamu pasti bisa!'}
                </p>

                {userIdentity?.name && (
                  <p style={{ fontSize: '0.9rem', color: '#8b5e3c', fontWeight: 700, marginTop: 4 }}>
                    🕵️ {userIdentity.name}{userIdentity.class ? ` • ${userIdentity.class}` : ''}
                  </p>
                )}

                <div className="score-display">
                  <div
                    className="score-circle"
                    style={{
                      background:
                        score >= quizQuestions.length * 0.7
                          ? 'linear-gradient(135deg, #4caf50, #2e7d32)'
                          : score >= quizQuestions.length * 0.4
                          ? 'linear-gradient(135deg, #f9c74f, #f4a100)'
                          : 'linear-gradient(135deg, #f44336, #c62828)'
                    }}
                  >
                    <span className="score-num">{score}</span>
                    <span className="score-max">/{quizQuestions.length}</span>
                  </div>
                  
                  <div className="score-stars">
                    {score === quizQuestions.length ? '⭐⭐⭐' : score >= quizQuestions.length * 0.7 ? '⭐⭐' : '⭐'}
                  </div>
                </div>

                <div className="review-list">
                  {answers.map((ans, idx) => (
                    <div key={idx} className={`review-item ${ans.correct ? 'ok' : 'bad'}`}>
                      <span className="review-icon">{ans.correct ? '✅' : '❌'}</span>
                      <span>
                        Soal {idx + 1}: <em>{ans.question.sentence || ans.question.question}</em>
                      </span>
                    </div>
                  ))}
                </div>

                {/* Leaderboard in Results */}
                {adminSettings.showLeaderboard && currentLeaderboard.length > 0 && (
                  <div className="hasil-leaderboard">
                    <h3 className="hasil-leaderboard-title">🏆 Papan Peringkat</h3>
                    <table className="hasil-leaderboard-table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Nama</th>
                          <th>Skor</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentLeaderboard.slice(0, 10).map((entry, idx) => {
                          const isSelf = entry.name === (userIdentity?.name || 'Anonim') &&
                            entry.id === currentLeaderboard.find(
                              (e) => e.name === (userIdentity?.name || 'Anonim')
                            )?.id;
                          return (
                            <tr
                              key={entry.id}
                              className={idx === 0 || idx === 1 || idx === 2 ? '' : ''}
                            >
                              <td>
                                {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : idx + 1}
                              </td>
                              <td>{entry.name || 'Anonim'}</td>
                              <td style={{ fontWeight: 800 }}>{entry.score}/{entry.total}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}

                <div className="hasil-buttons">
                  <button className="btn-main btn-ulang" onClick={() => {
                    setUserIdentity(null);
                    navigateTo('quiz');
                  }}>
                    🔄 Coba Lagi
                  </button>
                  <button className="btn-main btn-menu-back" onClick={() => {
                    setUserIdentity(null);
                    navigateTo('menu');
                  }}>
                    🏠 Menu
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirm Modal Dialog */}
      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmExit}
        message="Kembali ke menu utama? Progress latihanmu saat ini akan hilang."
      />

      {/* Answer Feedback Overlay */}
      <AnimatePresence>
        {feedback.show && (
          <motion.div
            className="feedback-overlay show"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleDismissFeedback}
          >
            <motion.div
              className="feedback-popup"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
            >
              <div className="feedback-icon">{feedback.correct ? '🎉' : '🤔'}</div>
              <h3 className="feedback-text">{feedback.correct ? 'Luar Biasa!' : 'Hampir Benar!'}</h3>
              <p
                className="feedback-explain"
                dangerouslySetInnerHTML={{ __html: feedback.explain }}
              />
              {feedback.answerStr && (
                <p className="feedback-explain" style={{ marginTop: '8px' }}>
                  <strong>{feedback.answerStr}</strong>
                </p>
              )}
              <p className="feedback-tap-hint">Ketuk di mana saja untuk lanjut 👇</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
