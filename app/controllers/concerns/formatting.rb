module Formatting
  
  private

  def camelize_record(record)
    pairs = record.attributes.map { |key, value| [key.camelize(:lower), value] }
    Hash[pairs]
  end

end