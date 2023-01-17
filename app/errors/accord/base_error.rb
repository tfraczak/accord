class BaseError < StandardError
  attr_reader :code, :extra

  def initialize(code: 500, extra: {}, message: 'Oops, something went wrong')
    super(message)
    @code = code
    @extra = extra
  end

  def as_json
    { error: message, metadata: metadata }
  end

  def metadata
    { extra: extra }
  end
end