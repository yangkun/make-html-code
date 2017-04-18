'use babel';

import { CompositeDisposable } from 'atom'

export default {
  subscriptions: null,
  config: {
    prefix: {
      title: 'Prefix',
      type: 'string',
      default: '<pre>'
    },
    suffix: {
      title: 'Suffix',
      type: 'string',
      default: '</pre>'
    }
  },

  activate(state) {
    this.subscriptions = new CompositeDisposable()
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'make-html-code:make': () => this.make()
    }))
  },

  deactivate() {
    this.subscriptions.dispose()
  },

  make() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      //console.log(selection)
      //let reversed = selection.split('').reverse().join('')
      let prefix = atom.config.get('make-html-code.prefix');
      let suffix = atom.config.get('make-html-code.suffix');
      let block = prefix + '\n' + selection.replace(/</g,'&lt;').replace(/>/g,'&gt;') + '\n' + suffix;
      editor.insertText(block)
    }
  }

};
