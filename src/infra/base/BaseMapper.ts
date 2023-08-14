export abstract class BaseMapper<TData, TModel> {
  /**
     * Converts TModel to TData
     * @param model
     * @returns An instance of TData
     */

  public abstract modelToData (model: TModel): TData

  /**
     * Converts TData to TModel
     * @param data
     * @returns An instance of TModel
     */
  public abstract dataToModel (data: TData): TModel

  /**
     * Converts an array of TModel into an array of TData
     * @param listModel
     * @returns An array of TData
     */
  public listModelToData (listModel: TModel[]): TData[] {
    const list: TData[] = []

    for (const item of listModel) {
      list.push(this.modelToData(item))
    }

    return list
  }

  /**
     * Converts an array of TData into an array of TModel
     * @param listData
     * @returns An array of TModel
     */
  public listDataToModel (listData: TData[]): TModel[] {
    const list: TModel[] = []

    for (const item of listData) {
      list.push(this.dataToModel(item))
    }

    return list
  }
}
