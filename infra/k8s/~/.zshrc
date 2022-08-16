export PATH =~/.npm-global/bin:$PATH

export HOME ="/Users/vegimik"

export ZSH ="/Users/sg/.oh-my-zsh"

ZSH_THEME="vegimistheme"
plugins=(git)
source $ZSH/oh-my-zsh.sh

alias dps="docker ps"
alias k="kubectl"
alias comp="zip -vr /tmp/`basename $PWD`.zip . -x "**/node_module""
alias code="code-insiders"

#The next line updates PATH for the Google Cloud SDK.
if [-f "$HOME/google-cloud-sdk/path.bash.inc"]; then source "$HOME/google-cloud-sdk/path.bash.inc"; fi

#The next line enables shell command completion for gcloud.
if [-f "$HOME/google-cloud-sdk/completion.bash.inc"]; then source "$HOME/google-cloud-sdk/completion.bash.inc"; fi

