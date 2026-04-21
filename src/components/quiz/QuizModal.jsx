import React, { useState, useEffect } from 'react'
import { X, CheckCircle2, ChevronRight, Award, RotateCcw, Loader2, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { StorageService } from '../../services/storage'
import { api } from '../../services/api'
import confetti from 'canvas-confetti'

export default function QuizModal({ isOpen, onClose, quizId, courseId, onPass }) {
  const [quiz, setQuiz] = useState(null)
  const [currentStep, setCurrentStep] = useState(0) // 0: Start, 1: Quiz, 2: Result
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (isOpen && quizId) {
      loadQuiz()
    }
  }, [isOpen, quizId])

  const loadQuiz = async () => {
    try {
      setLoading(true)
      setError(null)
      const token = StorageService.getToken()
      const data = await api.quizzes.getQuiz(quizId, token)
      if (data.success) {
        setQuiz(data.data)
      } else {
        setError(data.message || "Failed to load quiz")
      }
    } catch (err) {
      setError("Network error loading quiz")
    } finally {
      setLoading(false)
    }
  }

  const handleStart = () => setCurrentStep(1)

  const handleSelectAnswer = (optionId) => {
    setAnswers({
      ...answers,
      [quiz.questions[currentQuestionIndex].id]: optionId
    })
  }

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      handleSubmit()
    }
  }

  const handleSubmit = async () => {
    try {
      setSubmitting(true)
      const token = StorageService.getToken()
      const formattedAnswers = Object.keys(answers).map(qId => ({
        questionId: parseInt(qId),
        selectedOptionId: parseInt(answers[qId])
      }))

      const data = await api.quizzes.submitQuiz(quizId, formattedAnswers, token)
      
      if (data.success) {
        setResult(data.data)
        setCurrentStep(2)
        
        if (data.data.passed) {
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#001529', '#00020e', '#f7f9fc']
          })
          if (onPass) onPass(data.data.score)
        }
      } else {
        setError(data.message || "Submission failed")
      }
    } catch (err) {
      setError("Failed to submit quiz. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const handleRetry = () => {
    setCurrentStep(0)
    setCurrentQuestionIndex(0)
    setAnswers({})
    setResult(null)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-primary/20 backdrop-blur-md"
      />
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-2xl bg-surface rounded-[2.5rem] shadow-2xl border border-surface-dim/20 overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-surface-dim/10 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 signature-gradient rounded-xl flex items-center justify-center text-white">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-headline font-bold text-primary">{quiz?.title || 'Course Quiz'}</h3>
              <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">Knowledge Validation</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-surface-dim rounded-full transition-colors">
            <X className="w-5 h-5 text-secondary" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 min-h-[400px] flex flex-col">
          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
              <p className="font-bold text-secondary text-sm">Preparing Assessments...</p>
            </div>
          ) : error ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <h4 className="text-xl font-bold text-primary mb-2">Something went wrong</h4>
              <p className="text-on-surface-variant mb-8 max-w-xs">{error}</p>
              <button 
                onClick={loadQuiz}
                className="px-8 py-3 signature-gradient text-white rounded-xl font-bold"
              >
                Try Again
              </button>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {currentStep === 0 && (
                <motion.div 
                  key="start"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex-1 flex flex-col items-center justify-center text-center"
                >
                  <div className="w-20 h-20 bg-primary-container rounded-3xl flex items-center justify-center text-primary mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-3xl font-headline font-bold text-primary mb-4 tracking-tighter">Ready to Verify?</h4>
                  <p className="text-on-surface-variant mb-10 max-w-sm">
                    This quiz contains <span className="font-bold text-primary">{quiz?.questions?.length || 0} questions</span>. 
                    You need <span className="font-bold text-emerald-600">80%</span> to pass and earn your certificate.
                  </p>
                  <button 
                    onClick={handleStart}
                    className="w-full max-w-xs py-4 signature-gradient text-white rounded-2xl font-bold shadow-xl hover:opacity-90 transition-all active:scale-[0.98]"
                  >
                    Start Assessment
                  </button>
                </motion.div>
              )}

              {currentStep === 1 && quiz && (
                <motion.div 
                  key="quiz"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex-1 flex flex-col"
                >
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em]">Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
                       <span className="text-[10px] font-bold text-primary">{Math.round(((currentQuestionIndex + 1) / quiz.questions.length) * 100)}%</span>
                    </div>
                    <div className="w-full h-1 bg-surface-dim/20 rounded-full">
                       <motion.div 
                        className="h-full bg-primary rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
                       />
                    </div>
                  </div>

                  <h4 className="text-xl font-headline font-bold text-primary mb-8 leading-tight">
                    {quiz.questions[currentQuestionIndex].text}
                  </h4>

                  <div className="space-y-3 mb-8">
                    {quiz.questions[currentQuestionIndex].options.map(option => (
                      <button
                        key={option.id}
                        onClick={() => handleSelectAnswer(option.id)}
                        className={`w-full p-5 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between group ${
                          answers[quiz.questions[currentQuestionIndex].id] === option.id
                            ? 'bg-primary-container border-primary shadow-lg ring-1 ring-primary'
                            : 'bg-surface-container-low border-surface-dim/20 hover:border-primary/40'
                        }`}
                      >
                        <span className={`font-medium ${answers[quiz.questions[currentQuestionIndex].id] === option.id ? 'text-primary' : 'text-on-surface-variant'}`}>
                          {option.text}
                        </span>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          answers[quiz.questions[currentQuestionIndex].id] === option.id 
                            ? 'bg-primary border-primary' 
                            : 'border-surface-dim group-hover:border-primary/50'
                        }`}>
                          {answers[quiz.questions[currentQuestionIndex].id] === option.id && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="mt-auto">
                    <button
                      onClick={handleNext}
                      disabled={!answers[quiz.questions[currentQuestionIndex].id] || submitting}
                      className="w-full py-4 signature-gradient text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl disabled:opacity-50 transition-all hover:opacity-90 active:scale-[0.98]"
                    >
                      {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                        <>
                          {currentQuestionIndex < quiz.questions.length - 1 ? 'Next Question' : 'Submit Final Entry'}
                          <ChevronRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && result && (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex-1 flex flex-col items-center justify-center text-center"
                >
                  <div className={`w-24 h-24 rounded-[2rem] flex items-center justify-center mb-8 shadow-2xl ${
                    result.passed ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-red-500 text-white shadow-red-500/20'
                  }`}>
                    {result.passed ? <Award className="w-12 h-12" /> : <RotateCcw className="w-12 h-12" />}
                  </div>

                  <h4 className="text-4xl font-headline font-extrabold text-primary mb-2 italic tracking-tighter">
                    {result.passed ? 'Deployment Successful' : 'Recall Protocol'}
                  </h4>
                  <p className="text-on-surface-variant font-bold uppercase tracking-widest text-xs mb-8">
                    Final Assessment Score: {result.score}%
                  </p>

                  <div className="w-full max-w-sm bg-surface-container rounded-3xl p-6 mb-10 border border-surface-dim/10">
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      {result.passed 
                        ? "Authentication verified. You have exceeded the knowledge threshold for this curriculum asset. Your digital certificate has been generated."
                        : "Threshold not reached. Additional focus on course modules is required before re-attempting the validation protocol."
                      }
                    </p>
                  </div>

                  <div className="flex gap-4 w-full max-w-sm">
                    {result.passed ? (
                      <button 
                        onClick={onClose}
                        className="flex-1 py-4 signature-gradient text-white rounded-2xl font-bold shadow-xl"
                      >
                        Return to Player
                      </button>
                    ) : (
                      <>
                        <button 
                          onClick={onClose}
                          className="flex-1 py-4 bg-surface-container-high text-secondary rounded-2xl font-bold"
                        >
                          Exit
                        </button>
                        <button 
                          onClick={handleRetry}
                          className="flex-1 py-4 signature-gradient text-white rounded-2xl font-bold shadow-xl"
                        >
                          Retry
                        </button>
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </motion.div>
    </div>
  )
}
