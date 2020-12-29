;; Cooperation Commands

;; 1. The Symptom
;; 2. A Cure
;; 3. Generalizing the Solution

;; =============================================

;; Declaring Variables

;; Advantages to declaring variables with defvar:
;; 1. allows a docstring
;; 2. have a default value
;; 3. can use find-tag to quickly find variables
;; 4. when byte-compile the code, the byte compiler will warning that
;; hasn't been declared with defvar

(defvar unscroll-point (make-marker)
  "Cursor position for next call to 'unscroll'.")
(defvar unscroll-window-start (make-marker)
  "Window start for next call to 'unscroll'.")
(defvar unscroll-hscroll nil
  "Hscroll for next call to 'unscroll'.")

;; all scrollable command
(defadvice scroll-up (before remember-for-unscroll
			     activate compile)
  "Remeber where we started from, for 'unscroll'."
  (unscroll-maybe-remeber))

(defadvice scroll-down (before remeber-for-unscroll
			       activate compile)
  "Remeber where we started from, for 'unscroll'."
  (unscroll-maybe-remeber))

(defadvice scroll-left (before remeber-for-unscroll
			       activate compile)
  "Remeber where we started from, for 'unscroll'."
  (unscroll-maybe-remeber))

(defadvice scroll-right (before remeber-for-unscroll
			       activate compile)
  "Remeber where we started from, for 'unscroll'."
  (unscroll-maybe-remeber))


;; too many repeat, we need refactor it;
(defun unscroll-maybe-remeber1 ()
  (if (not (or (eq last-command 'scroll-down)
	       (eq last-command 'scroll-up)
	       (eq last-command 'scroll-left)
	       (eq last-command 'scroll-right)))

      (setq unscroll-window-start (window-start)
	    unscroll-point (point)
	    unscroll-hscroll (window-hscroll))))

;; In fact, the way last-command gets set is this:
;; while Emacs is executing a command, this-command contains the name of the command;
;; then when it is finished, Emacs puts the value of this-command into last-command
(defun unscroll-maybe-remeber2 ()
  ;; First. set this-command to 'unscrollable
  (setq this-command 'unscrollable)
  (if (not (eq last-command 'unscrollable))
      (setq unscroll-window-start (window-start)
	    unscroll-point (point)
	    unscroll-hscroll (window-hscroll))))

;; use this-command is ok, but
;; so we use Symbol Properties instead this-command
(put 'scroll-up 'unscrollable t)
(put 'scroll-down 'unscrollable t)
(put 'scroll-left 'unscrollable t)
(put 'scroll-right 'unscrollable t)

(defun unscroll-maybe-remeber3 ()
  (if (not (get last-command 'unscrollable))
      (setq unscroll-window-start (window-start)
	    unscroll-point (point)
	    unscroll-hscroll (window-hscroll))))

;; Suppose you inadvertently srcoll-down a few times and you want to unscroll.
;; But before you do, you happen to see a bit of text you'd like to change, and
;; you will change it. Then you unscroll. The screen hasn't been correctly restored!

;; It would be a good idea to use markers to instead of using absolute positions
;; A marker is a special object that specifies a buffer position just like an integer
;; does, But if the buffer position moves because of insertions or deletions, the
;; marker "moves" too so that it keeps pointing to the same spot in the text.

(defun unscroll-maybe-remeber ()
  (if (not (get last-command 'unscrollable))
      (progn
	(set-marker unscroll-point (point-marker))
	(set-marker unscroll-window-start (window-start))
	(setq unscroll-hscroll (window-hscroll)))))


(defun unscroll ()
  "Revert to 'unscroll-point' and 'unscroll-window-start'."
  (interactive)
  (goto-char unscroll-point)
  (set-window-start nil unscroll-window-start)
  (set-window-hscroll nil unscroll-hscroll))

