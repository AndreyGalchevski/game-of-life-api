const gameService = {
  checkIfInBounds: (
    grid: Array<Array<number>>,
    row: number,
    col: number
  ): boolean =>
    row >= 0 && col >= 0 && row < grid.length && col < grid[0].length,

  getLiveNeighbors: (
    grid: Array<Array<number>>,
    row: number,
    col: number
  ): number => {
    const directions = [
      [0, 1],
      [1, 0],
      [1, 1],
      [-1, -1],
      [0, -1],
      [-1, 0],
      [-1, 1],
      [1, -1],
    ];

    let liveNeighbors = 0;

    for (const direction of directions) {
      const rowOffset = row + direction[0];
      const colOffset = col + direction[1];

      if (!gameService.checkIfInBounds(grid, rowOffset, colOffset)) {
        continue;
      }

      const neighbor = grid[rowOffset][colOffset];

      if (neighbor === 1 || neighbor === 2) {
        liveNeighbors += 1;
      }
    }

    return liveNeighbors;
  },

  handleNextStep: (grid: Array<Array<number>>): Array<Array<number>> => {
    const updatedGrid: Array<Array<number>> = JSON.parse(JSON.stringify(grid));

    for (const [rowIndex, row] of grid.entries()) {
      for (const [colIndex, cell] of row.entries()) {
        const liveNeighbors = gameService.getLiveNeighbors(
          grid,
          rowIndex,
          colIndex
        );

        if (cell === 0 && liveNeighbors === 3) {
          updatedGrid[rowIndex][colIndex] = 3;
        } else if (cell === 1 && (liveNeighbors < 2 || liveNeighbors > 3)) {
          updatedGrid[rowIndex][colIndex] = 2;
        }
      }
    }

    for (const [rowIndex, row] of grid.entries()) {
      for (const [colIndex] of row.entries()) {
        updatedGrid[rowIndex][colIndex] %= 2;
      }
    }

    return updatedGrid;
  },
};

export default gameService;
