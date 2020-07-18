import IStorageProvider from '@shared/container/providers/StorageProvider/modules/IStorageProvider';

class FakeStorageProvider implements IStorageProvider {
  private storage: string[] = [];

  public async saveFile(file: string): Promise<string> {
    this.storage.push(file);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const findIndex = this.storage.findIndex(
      storageFile => storageFile === file,
    );

    if (findIndex) {
      this.storage.splice(findIndex, 1);
    }
  }
}

export default FakeStorageProvider;
