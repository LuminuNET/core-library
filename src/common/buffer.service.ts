class LuminuBuffer {
  private _buffer: Buffer;

  constructor() {
    this._buffer = Buffer.from('');
  }

  public writeInt(number: number): void {
    const _buffer = Buffer.alloc(4);
    _buffer.writeUInt32BE(number, 0);
    this._buffer = Buffer.concat([this._buffer, _buffer]);
  }

  public writeString(string: string): void {
    const buffer = Buffer.alloc(string.length);

    this.writeInt(string.length);
    buffer.write(string, 0);

    this._buffer = Buffer.concat([this._buffer, buffer]);
  }

  get buffer(): Buffer {
    return this._buffer;
  }
}

export default LuminuBuffer;
