function solveSudoku() {
    // Collect input values
    let grid = [];
    for (let i = 0; i < 9; i++) {
      grid[i] = [];
      for (let j = 0; j < 9; j++) {
        const value = document.getElementById(`cell-${i}-${j}`).value;
        grid[i][j] = value === '' ? 0 : parseInt(value);
      }
    }
  
    // Call the solving algorithm
    if (solve(grid)) {
      // If solved successfully, update input fields
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          document.getElementById(`cell-${i}-${j}`).value = grid[i][j];
        }
      }
      alert('Sudoku Solved Successfully!');
    } else {
      alert('No solution exists for this Sudoku!');
    }
  }
  
  function solve(grid) {
    // Solve the Sudoku using backtracking algorithm
    const emptyCell = findEmptyCell(grid);
    if (!emptyCell) {
      return true; // Sudoku solved
    }
  
    const [row, col] = emptyCell;
  
    for (let num = 1; num <= 9; num++) {
      if (isValid(grid, row, col, num)) {
        grid[row][col] = num;
  
        if (solve(grid)) {
          return true;
        }
  
        grid[row][col] = 0;
      }
    }
  
    return false; // No solution found
  }
  
  function findEmptyCell(grid) {
    // Find an empty cell in the grid
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (grid[i][j] === 0) {
          return [i, j];
        }
      }
    }
    return null; // No empty cell found
  }
  
  function isValid(grid, row, col, num) {
    // Check if it's valid to place 'num' at grid[row][col]
    for (let i = 0; i < 9; i++) {
      if (grid[row][i] === num || grid[i][col] === num) {
        return false;
      }
    }
  
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if (grid[i][j] === num) {
          return false;
        }
      }
    }
  
    return true;
  }
  