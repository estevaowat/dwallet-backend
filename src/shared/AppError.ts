class AppError extends Error {
   private statusCode: number;

   private description: string;

   private isOperational: boolean;

   constructor(
      statusCode: number,
      description: string,
      isOperational: boolean,
   ) {
      super(description);

      this.statusCode = statusCode;
      this.description = description;
      this.isOperational = isOperational;
   }

   public getStatusCode() {
      return this.statusCode;
   }

   public getDescription() {
      return this.description;
   }

   public getIsOperational() {
      return this.isOperational;
   }
}

export default AppError;
