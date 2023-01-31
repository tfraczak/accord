class GridWalker
  MOVES = [[-1,0],[1,0],[0,-1],[0,1]]

  attr_reader :grid,
              :raw_grid,
              :prev_pos
  attr_accessor :moves,
                :path_count,
                :steps_needed,
                :step_count

  def intitialize(raw_grid)
    @raw_grid = raw_grid
    convert_to_hash!
    @moves = []
    @path_count = 0
    @steps_needed = 0
    @step_count = 0
  end

  def convert_to_hash!
    @grid ||= {}
    raw_grid.each.with_index do |row, y|
      row.each.with_index do |value, x|
        pos = [x,y]
        grid[pos] = { value: value, moveable: true }
        grid[pos][:moveable] = false unless value.zero?
        steps_needed += 1 if value.zero?
      end
    end
  end

  def reset_grid!
    grid.each { |pos, hash| grid[pos] = hash.merge({ moveable: true }) if grid[pos][:value].zero? }
  end

  def reset_pos(pos)
    grid[pos][:moveable] = true
  end

  def possible_move?(pos)
    !pos[0].negative? && !pos[1].negative? && grid[pos][:moveable]
  end

  def possible_moves(pos)
    moves = MOVES.select do |(dx, dy)|
      x, y = pos[0], pos[1]
      possible_move?([x+dx, y+dy])
    end

    moves.map { |(dx, dy)| [pos[0] + dx, pos[1] + dy] }
  end

  def ending_point_near?(pos)
    MOVES.any? do |(dx, dy)|
      new_pos = [current_pos[0] + dx, current_pos[1] + dy]
      grid[new_pos][:value] == 2
    end
  end

  def make_pos_immovable(pos)
    grid[pos].merge!({ moveable: false })
  end

  def build_walks(walks = [])
    moves = possible_moves(starting_pos)
    return 0 if moves.empty

    while moves.any?
      next_pos = moves.pop
      walk = []
      walks << build_walk(next_pos, walk)
    end

    walks
  end
end