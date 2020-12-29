(defvar insert-time-format "%X"
  "*Format for \\[insert-time] (c.f. 'format-time-string').")
(defvar insert-date-format "%x"
  "*Format for \\[insert-date] (c.f. 'format-time-string').")

(defun insert-time ()
  "Insert the current time according to insert-time-format"
  (interactive "*")
  (insert (format-time-string insert-time-format
                              (current-time))))

(defun insert-date ()
  "Insert the current date according to insert-date-format"
  (interactive "*")
  (insert (format-time-string insert-date-format
                              (current-time))))

(defvar writestamp-format "%C"
  "*Format for writestamps (c.f. 'format-time-string'.")
(defvar writestamp-prefix "WRITESTAMPS(("
  "*Unique string identifying start of writestamp.")
(defvar writestamp-suffix "))"
  "*String that terminates a writestamp.")

(defun update-writestamps ()
  (save-excursion
    (save-restriction
      (save-match-data
        (widen)
        (goto-char (point-min))
        (let ((regexp (concat "^"
                              (regexp-quote writestamp-prefix)
                              "\\(.*\\)"
                              (regexp-quote writestamp-suffix)
                              "$")))
          (while (re-search-forward regexp nil t)
            (replace-match (format-time-string writestamp-format
                                               (current-time))
                           t t nil 1))))))
  nil)


(defvar modifystamp-format "%C"
  "*Format for modifystamps (c.f. 'format-time-string'.")
(defvar modifystamp-prefix "MODIFYSTAMP(("
  "*String identifying start of modifystamp.")
(defvar modifystamp-suffix "))"
  "*String that terminates a modifystamp.")

(defun update-modifystamps (time)
  "Find modifystamps and replace them with the current time"
  (save-excursion
    (save-restriction
      (save-match-data
        (widen)
        (goto-char (point-min))
        (let ((regexp (concat "^"
                              (regexp-quote modifystamp-prefix)
                              "\\(.*\\)"
                              (regexp-quote modifystamp-suffix)
                              "$")))
          (while (re-search-forward regexp nil t)
            (replace-match (format-time-string modifystamp-format
                                               time)
                           t t nil 1))))))
  (setq last-change-time nil)
  nil)

(defun maybe-update-modifystamps ()
  "Call 'update-modifystamps' if the buffer has been modified."
  (if last-change-time
      (update-modifystamps last-change-time)))

(defvar last-change-time nil
  "Time of last buffer modification.")

(defun remeber-change-time (&rest unused)
  "Store the current time in 'last-change-time'."
  (setq last-change-time (current-time)))


(provide 'timestamp)
