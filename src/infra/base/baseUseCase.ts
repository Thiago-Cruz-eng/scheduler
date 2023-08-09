// Interface for BaseUseCase
export interface BaseUseCaseInterface<T> {
    validate(): boolean | Promise<boolean>
    execute(subscriber:any): void
}

// BaseUseCase class to optimize UseCase inheritance and use
export const BaseUseCaseInterface = Symbol('BaseUseCaseInterface')

export abstract class BaseUseCase<T> implements BaseUseCaseInterface<T> {

    /**
     * Just calls validate and returns buildUseCase Observable. It will be called by execute
     * @see validate
     * @see buildUseCase
     * @see execute
     */
    private getObservable(): any {
        try {
            this.validate()
            return this.buildUseCase()
        } catch(error: any) {
            return Error()
        }
    }

    /**
     * You should override this method in order to validate your data before call execute
     * @throws BaseException
     * @see execute
     */
    validate(): boolean | Promise<boolean> {
        return true
    }

    /**
     * This method needs to be overriden because this is where you will put your service calls
     * @protected
     * @returns An Observable<T> to be subscribed by execute subscriber
     * @see getObservable
     */
    protected abstract buildUseCase(): any


    /**
     * Execute the UseCase routine
     * @returns Observable<T>
     * @see getObservable
     */
    execute(): any {
        return this.getObservable()
    }

}