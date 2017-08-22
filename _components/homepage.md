# Building style guides with kss-node

This software is a Node.js implementation of [Knyle Style Sheets](https://github.com/kneath/kss) (KSS), "a documentation syntax for CSS" that's intended to have syntax readable by humans *and* machines. Hence, the kss-node software can be used to create a "living style guide".

Here's an example KSS comment:
<pre class="prettyprint linenums lang-css"><code data-language="css">// Buttons
//
// :hover           - Highlights when hovering.
// :disabled        - Disabled.
// .button--primary - Primary.
//
// Markup: _buttons.twig
//
// Style guide: Base.Buttons

.button {
  ...
  
  &:focus {
    ...
  }
    
  &:disabled {
    ...
  }
      
  .&--primary {
    ...
  }
}

</code></pre>

## Quick start guide

**For more information on how to write KSS comments, see the [KSS spec](https://github.com/kss-node/kss/blob/spec/SPEC.md).**

Documentation on how to get started with kss-node (and with Node.js' npm) is available on the [kss-node wiki](https://github.com/kss-node/kss-node/wiki).
