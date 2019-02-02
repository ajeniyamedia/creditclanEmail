import { ErrorHandler } from '@angular/core';

export class AppErrorHander implements ErrorHandler {
    handleError(error) {
        console.log(error);
    }
}