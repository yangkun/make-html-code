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
    },
    escapeAll: {
      title: 'escapeAll',
      type: 'boolean',
      default: true,
      description: 'escape & and " too.'
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
      let prefix = atom.config.get('make-html-code.prefix');
      let suffix = atom.config.get('make-html-code.suffix');
      var block = selection;
      if(atom.config.get('make-html-code.escapeAll')) block = block.replace(/&/g,'&amp;').replace(/"/g,'&quot;');
      var block = block.replace(/</g,'&lt;').replace(/>/g,'&gt;');
      editor.insertText(prefix + '\n' + block + '\n' + suffix);
    }
  }

};
