import type { DirectiveBinding, ObjectDirective } from 'vue'

type ClickOutsideHandler = (event: MouseEvent) => void

const clickOutsideMap = new WeakMap<HTMLElement, ClickOutsideHandler>()

/**
 * Directive to handle clicks outside of an element
 * Usage: v-click-outside="handlerFunction"
 */
export const clickOutside: ObjectDirective<HTMLElement, ClickOutsideHandler> = {
  beforeMount(el: HTMLElement, binding: DirectiveBinding<ClickOutsideHandler>) {
    // Only run the directive if the binding value is a function
    if (typeof binding.value !== 'function') {
      console.warn('[v-click-outside] Provided expression must be a function')
      return
    }

    // Create a new handler function that will be called on document click
    const handler: ClickOutsideHandler = (event: MouseEvent) => {
      // Check if the clicked element is outside the bound element and its children
      if (!el || el === event.target || event.composedPath().includes(el)) {
        return
      }
      
      // Call the provided handler
      binding.value(event)
    }


    // Store the handler in the WeakMap for later cleanup
    clickOutsideMap.set(el, handler)
    
    // Add the event listener with capture to ensure it runs before other click handlers
    document.addEventListener('click', handler, true)
  },
  
  unmounted(el: HTMLElement) {
    // Clean up the event listener when the element is unmounted
    const handler = clickOutsideMap.get(el)
    if (handler) {
      document.removeEventListener('click', handler, true)
      clickOutsideMap.delete(el)
    }
  },
  
  // Add updated hook to handle dynamic handler changes
  updated(el: HTMLElement, binding: DirectiveBinding<ClickOutsideHandler>) {
    if (binding.value !== binding.oldValue) {
      // Remove old handler
      const oldHandler = clickOutsideMap.get(el)
      if (oldHandler) {
        document.removeEventListener('click', oldHandler, true)
      }
      
      // Add new handler
      if (typeof binding.value === 'function') {
        const handler: ClickOutsideHandler = (event: MouseEvent) => {
          if (!el || el === event.target || event.composedPath().includes(el)) {
            return
          }
          binding.value(event)
        }
        clickOutsideMap.set(el, handler)
        document.addEventListener('click', handler, true)
      }
    }
  }
}

// Register the directive globally in the app
// This will be done in main.ts using app.directive('click-outside', clickOutside)
