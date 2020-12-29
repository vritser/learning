;; Chapter 7. Minor Mode

;; Define a variable named name-mode. Make it buffer-local. The minor mode is
;; "on" in a buffer if that buffer's value of name-mode is non-nil, "off" otherwise.
(defvar refill-mode nil
  "Mode variable for refill minor mode.")
(make-variable-buffer-local 'refill-mode)

;; Define a command called name-mode. The command should take one optional argument.
;; With no arguments, it should toggle the mode on or off. With an argument, it should
;; turn the mode on if the prefix-numeric-value of the argument is greater than zero,
;; off otherwise.

(defun refill-mode (&optional arg)
  "Refill minor mode"
  (interactive "P")
  (setq refill-mode
        (if (null arg)
            (not refill-mode)
          (> (prefix-numeric-value arg) 0)))

  (if refill-mode
      ;; turn on refill-mode
      (add-hook 'after-change-functions 'refill nil t)
    ;; turn off refill-mode
    (remove-hook 'after-change-functions 'refill nil t)))


(defun refill (start end len)
  "After a text change, refill the current paragraph."
  (let ((left (if (zerop len)
                  start
                (max (save-excursion
                       (goto-char start)
                       (beginning-of-line 0)
                       (point))
                     (save-excursion
                       (goto-char start)
                       (backward-paragraph 1)
                       (point))))))
    (if (or (and (zerop len)
                 (same-line-p start end)
                 (short-line-p end))
            (and (eq (char-syntax (preceding-char))
                     ?\ )
                 (looking-at "\\s *$")))
        nil
      (save-excursion
        (fill-region left end nil nil t)))))

(defun before-2nd-word-p (pos)
  "Does POS lie before the second word one the line?"
  (save-excursion
    (goto-char pos)
    (beginning-of-line)
    (skip-chars-forward (concat "^ "
                                (char-to-string
                                 (char-syntax ?\n))))
    (skip-chars-forward " ")
    (< pos (point))))


(defun same-line-p (start end)
  "Are START and END on the same line?"
  (save-excursion
    (goto-char start)
    (end-of-line)
    (< end (point))))

(defun short-line-p (pos)
  "Does line containing POS stay within 'fill-column'?"
  (save-excursion
    (goto-char pos)
    (end-of-line)
    (< (current-column) fill-column)))

(if (not (assq 'refill-mode minor-mode-alist))
    (setq minor-mode-alist
          (cons '(refill-mode "Refill")
                minor-mode-alist)))
