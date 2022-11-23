export class CourseEnrollement {

    constructor(
        public id?: number,
        public courseId?: number,
        public userId?: number,
        public datetimeCreated?: Date
    ){}
}
