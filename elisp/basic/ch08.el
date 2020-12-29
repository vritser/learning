;;; Chapter 8. Evaluation and Error Recovery

(defun limited-save-excursion1 (&rest exprs)
  "Like save-excursion, but only restores point."
  (let ((saved-point (point)))
    (while exprs
      (eval (car exprs))
      (setq exprs (cdr exprs)))
    (goto-char saved-point)))

;; Define a Macro
(defmacro incr (var)
  "Add on to the named variable."
  (list 'setq var (list '+ var 1)))

(defmacro incr (var)
  "Add on to the named variable."
  `(setq ,var (+ ,var 1)))

(setq x 10)
(incr x)                                ; x => 11

;; Use symbol to avoid duplicate names.
(defmacro limited-save-excursion2 (&rest exprs)
  "Like save-excursion, but only restores point."
  (let ((origin-point-symbol (make-symbol "origin-point")))
    `(let* ((,origin-point-symbol (point))
            (result (progn ,@exprs)))
       (goto-char ,origin-point-symbol)
       result)))


;; Failing Gracefully

;; unwind-protect take one expression to eavluate normally, followed by
;; any number of expressions to execute afterward --- even if an error
;; interrupted the first expressionn.
;; (unwind-protect
;;      normal
;;    cleanup1
;;    cleanup2
;;       ...)
(defmacro limited-save-excursion (&rest exps)
  "Like save-excursion, but only restores point."
  ;; Turn the let* back into a let.
  (let ((origin-point-symbol (make-symbol "origin-point")))
    `(let ((,origin-point-symbol (point-marker)))
       (unwind-protect
           (progn ,@exps)
         (goto-char ,origin-point-symbol)))))
;; One side benefit of unwind-protect is that in the no-error case, it
;; return value is the value of the "normal" subexpression. (When there
;; is an error, the return value doesn't matter.)
