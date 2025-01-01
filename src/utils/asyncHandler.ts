import { Request, Response, NextFunction } from 'express';

type AsyncRequestHandler<T = void> = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<T>;

const asyncHandler = <T>(requestHandler: AsyncRequestHandler<T>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
    };
};

export {asyncHandler};












// import { Request, Response, NextFunction } from 'express';

// type AsyncRequestHandler = (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) => Promise<any>;

// const asyncHandler = (requestHandler: AsyncRequestHandler) => {
//     return (req: Request, res: Response, next: NextFunction) => {
//         Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
//     };
// };

// export default asyncHandler;