;; Searching and Modifying Buffers

;; 1. Inserting the Current Time

;; \[command]
;; For example:
;; If C-x t invokes insert-time, then the docstrings |  "*Format for \\[insert-time] (c.f. 'format-time-string')." |
;; is displayed as |  "*Format for C-x t (c.f. 'format-time-string')." |
(defvar insert-time-format "%X"
  "*Format for \\[insert-time] (c.f. 'format-time-string').")
(defvar insert-date-format "%x"
  "*Format for \\[insert-date] (c.f. 'format-time-string').")

;; (interactive "*") means "abort this function if the  current buffer is read-only" 
;; It is better to detect a read-only buffer before a function begins its work than to let it get halfway throuth
;; then die from a "Buffer is read-only" error.
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

;; 2. Writestamps

(add-hook 'local-write-file-hooks 'update-writestamps)
(defun update-writestamps1 ()
  ;; What save-excursion does is memorize the position of the cursor
  ;; execute the subexpressions it's given as arguments, then restore
  ;; the cursor to its original position.
  (save-excursion
    ;; This like save-excursionn in that it memorizes some information,
    ;; then execute its arguments, then restore the information.
    ;; The information in this case is the buffer's restriction, which is
    ;; the result of narrowing.
    (save-restriction
      ;; This like both above, memorizes some information, executs its
      ;; arguments, then restore the information. This time the information
      ;; in question is the result of the last search. Each time a search
      ;; occurs, information about the result of the search is stored in
      ;; some global variables. 
      (save-match-data
        (widen)
        ;; Also can write (goto-char 1)
        (goto-char (point-min))
        (while (search-forward "WRITESTAMPS((" nil t)
          (let ((start (point)))
            ;; Fail-Fast if not match
            (search-forward "))")
            (delete-region start (- (point) 2))
            (goto-char start)
            (insert-date))))))
  nil)

;; Generalizing Writestamps

(defvar writestamp-format "%C"
  "*Format for writestamps (c.f. 'format-time-string'.")
(defvar writestamp-prefix "WRITESTAMPS(("
  "*Unique string identifying start of writestamp.")
(defvar writestamp-suffix "))"
  "*String that terminates a writestamp.")

;; Then modify update-writestamps to be more configurable.

(defun update-writestamps2 ()
  (save-excursion
    (save-restriction
      (save-match-data
        (widen)
        (goto-char (point-min))
        (while (search-forward writestame-prefix nil t)
          (let ((start (point)))
            (search-forward writestamp-suffix)
            ;; (delete-region start (- (point)
                                    ;; (length writestamp-suffix)))

            ;; search-forward: the position where the match begins, is stored
            ;; in Emacs's global match-data variables. The way to access this data
            ;; is with the functions `match-beginning` and `match-end`.
            (delete-region start (match-beginning 0))
            (goto-char start)
            (insert (format-time-string writestamp-format
                                        (current-time))))))))
  nil)

;; Regular Expressions
;; Regexp Quoting

;; Both wrong! Becaulse the prefix or suffix maybe contains regexp characters.
;; (re-search-forward (concat "^"
                           ;; writestamp-prefix))
;; (re-search-forward (concat writestamp-suffix
                           ;; "$"))
;; Use `regex-quote` encode regex
(defun update-writestamps3 ()
  (save-excursion
    (save-restriction
      (save-match-data
        (widen)
        (goto-char (point-min))
        (while (re-search-forward (concat "^"
                                          (regexp-quote writestamp-prefix))
                                  nil t)
          (let ((start (point)))
              (re-search-forward (concat (regexp-quote writestamp-suffix)
                                         "$")
                                 (save-excursion
                                   (end-of-linie)
                                   (point))
                                 t)
            (delete-region start (match-beginning 0))
            (goto-char start)
            (insert (format-time-string writestamp-format
                                        (current-time))))))))
  nil)

;; Pure regexp do this
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


(setq writestamp-format "%Y-%m-%d %H:%M:%S")

;; 3. Modifystamps

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

;; (add-hook 'first-change-hook 'update-modifystamps nil t)

(defun maybe-update-modifystamps ()
  "Call 'update-modifystamps' if the buffer has been modified."
  (if last-change-time
      (update-modifystamps last-change-time)))

;; (add-hook 'local-write-file-hooks 'maybe-update-modifystamps)
(add-hook 'local-write-file-hooks
          '(lambda ()
             (if last-change-time
                 (update-modifystamps last-change-time))))
(setq modifystamp-format "%H:%M:%S")

(defvar last-change-time nil
  "Time of last buffer modification.")
(make-variable-buffer-local 'last-change-time)

(defun remeber-change-time (&rest unused)
  "Store the current time in 'last-change-time'."
  (setq last-change-time (current-time)))
(add-hook 'after-change-functions 'remeber-change-time nil t)









WRITESTAMPS((2019-11-04 16:10:57))
MODIFYSTAMP((16:10:30))
