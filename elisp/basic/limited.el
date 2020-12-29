(defmacro limited-save-excursion (&rest exps)
  "Like save-excursion, but only restores point."
  ;; Turn the let* back into a let.
  (let ((origin-point-symbol (make-symbol "origin-point")))
    `(let ((,origin-point-symbol (point-marker)))
       (unwind-protect
           (progn ,@exps)
         (goto-char ,origin-point-symbol)))))

(provide 'limited)
