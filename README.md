# game-of-life

Conway’s Game of Life isn’t an ideal candidate for a React implementation, as performance quickly deteriorates when rendering tens-of-thousands of components.

However, this example demonstrates an optimized approach, leveraging memoization, requestAnimationFrame, and various refs to achieve smooth performance. It efficiently renders a 100x100 grid with 100ms step interval at 60 FPS in Chrome on an M4 Mac.
