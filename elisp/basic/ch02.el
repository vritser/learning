;; simple new commands

;; 1. Traversing Windows

(global-set-key (kbd "C-x C-n") 'other-window)

;; backward window
(defun other-window-backward (&optional n)
  "Select the previous window."
  (interactive "P")
  (other-window (- (prefix-numeric-value n))))

(global-set-key (kbd "C-x C-p") 'other-window-backward)

;; 2. Line-at-a-Time Scrolling

(defalias 'scroll-ahead 'scroll-up)
(defalias 'scroll-behind 'scroll-down)

(defun scroll-one-line-ahead (&optional n)
  "Scroll ahead one line."
  (interactive "P")
  (scroll-ahead (prefix-numeric-value n)))

(defun scroll-one-line-behind (&optional n)
  "Scroll behind one line."
  (interactive "P")
  (scroll-behind (prefix-numeric-value n)))

(global-set-key (kbd "C-q") 'scroll-one-line-behind)
(global-set-key (kbd "C-z") 'scroll-one-line-ahead)

(global-set-key (kbd "C-x C-q") 'quoted-insert)
(global-set-key (kbd "C-x C-z") 'iconify-or-deiconify-frame)

;; 3. Other Cursor and Text Motion Commands

(defun point-to-top ()
  "Put point on top line of window."
  (interactive)
  (move-to-window-line 0))
(global-set-key (kbd "M-,") 'point-to-top)

(defun point-to-bottom ()
  "Put point at beginning of last visible line."
  (interactive)
  (move-to-window-line -1))
(global-set-key (kbd "M-.") 'point-to-bottom)

(defun line-to-top ()
  "Move current line to top of window."
  (interactive)
  (recenter 0))
(global-set-key (kbd "M-!") 'line-to-top)

;; rebind old bind
(global-set-key (kbd "C-x ,") 'tags-loop-continue)
(global-set-key (kbd "C-x .") 'find-tag)
(global-set-key (kbd "C-x !") 'shell-command)

;; 4. Clobbering Symbolic Links

;; Hooks
(defun read-only-if-symlink ()
  (if (file-symlink-p buffer-file-name)
      (progn
	(setq buffer-read-only t)
	(message "File is a symlink"))))

(add-hook 'find-file-hooks 'read-only-if-symlink)

;; Anonymous Functions
(lambda ()
  (if (file-symlink-p buffer-file-name)
      (progn
	(setq buffer-read-only t)
	(message "File is a symlink"))))

;; Handling he Symlink
(defun visit-target-instead ()
  "Replace this buffer with a buffer visiting the link target."
  (interactive)
  (if buffer-file-name
      (let ((target (file-symlink-p buffer-file-name)))
	(if target
	    (find-alternate-file target)
	  (error "Not visiting a symlink")))
    (error "Not visiting a file")))

(defun clobber-symlink ()
  "Replace symlink with a copy of the file."
  (interactive)
  (if buffer-file-name
      (let ((target (file-symlink-p buffer-file-name)))
	(if target
	    (if (yes-or-no-p (format "Replace %s with %s?"
				     buffer-file-name
				     target))
		(progn
		  (delete-file buffer-file-name)
		  (write-file buffer-file-name)))
	  (error "Not visiting a symlink")))
    (error "Not visiting a file")))

(global-set-key (kbd "C-x t") 'visit-target-instead)
(global-set-key (kbd "C-x l") 'clobber-symlink)

;; 5. Advised Buffer Switching

;; activate means that this advice should be active as soon as it's defined
;; (it's possible to define advice but leave it inactive);

;; compile means that the advice code should be "byte-compiled" for speed.
(defadvice switch-to-buffer (before existing-buffer
				    activate compile)
  "When interactive, switch to existing buffers only,
unless given a prefix argument."
  ;; when the argument to interactive is some expression other than a string,
  ;; that expression is evaluated to get a list of arguments that should be
  ;; passed to the function. (in this case the function is switch-to-buffer)
  (interactive
   (list (read-buffer "Switch to buffer:"
		      (other-buffer)
		      (null current-prefix-arg)))))
;; TODO: define advice for switch to window/frame

;; 6. Addendum: Raw Prefix Argument

(current-prefix-arg)
;; always contains the latest "raw" prefix argument,
;; which is the same thing you get from (interactive "P")

(prefix-numeric-value)
;; get a "raw" prefix argument numeric value
;; same as (interactive "p")
