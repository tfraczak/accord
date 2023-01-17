# frozen_string_literal: true

class Hash
  def camelize
    pairs = self.map do |key, value|
      camel_key = key.to_s.camelize(:lower)
      if value.is_a?(Hash)
        new_value = value.camelize
      elsif value.is_a?(Array) || value.is_a?(Set)
        new_value = value.map { |item| item.is_a?(Hash) ? item.camelize : item }
      else
        new_value = value
      end
      [camel_key, new_value]
    end
    Hash[pairs].with_indifferent_access
  end
end