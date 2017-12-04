let interval

const DynamicTTL = {
  componentUpdated (el, binding) {
    clearInterval(interval)
    if (el) {
      let ttl = binding.value

      interval = setInterval(() => {
        ttl -= 1
        el.innerHTML = ttl

        if (ttl <= 0) {
          clearInterval(interval)
        }
      }, 1000)
    }
  }
}

export default DynamicTTL
