import { Request, Response } from 'express';
import { MESSAGE, STATUS_CODE, failAction, successAction } from '../utilis/messages/response';
import { BooksServices } from '../services/products.services';
import Redis from 'ioredis';
const redisSubscriber = new Redis();

export class productController {
  public static async createNewProduct(req: Request, res: Response) {
    try {
      const data = await BooksServices.addNewBook(req.body);
      if (data) {
        res.status(STATUS_CODE.SUCCESS).json(successAction(STATUS_CODE.SUCCESS, data, MESSAGE.add('Book')));
      } else {
        res.status(STATUS_CODE.NOT_CREATED);
      }
    } catch (err: any) {
      // logger.error(message.errorLog('productAdd', 'productController', err))
      res.status(STATUS_CODE.BAD_REQUEST).json(failAction(STATUS_CODE.BAD_REQUEST, err.MESSAGE, MESSAGE.SOMETHING_WENT_WRONG));
    }
  }

  //Get store by Id
  public static async getBookById(req: Request, res: Response) {
    try {
      const bookId = req.params.id;

      const findBook = await BooksServices.getBookById(bookId);

      if (!findBook) {
        res.status(STATUS_CODE.NOT_CREATED).json(failAction(STATUS_CODE.SUCCESS, MESSAGE.notExist('Book not existed')));
      }

      res.status(STATUS_CODE.SUCCESS).json(successAction(STATUS_CODE.SUCCESS, findBook, MESSAGE.fetch('Store')));
    } catch (err: any) {
      // logger.error(MESSAGE.errorLog('userList', 'userController', err))
      res.status(STATUS_CODE.BAD_REQUEST).json(failAction(STATUS_CODE.BAD_REQUEST, err.MESSAGE, MESSAGE.SOMETHING_WENT_WRONG));
    }
  }

  //Get All Books
  public static async getAllBooks(req: Request, res: Response) {
    try {
      // console.log('gyfduhdjigf')
      const bookData = await BooksServices.getAllbooks();
      res.status(STATUS_CODE.SUCCESS).json(successAction(STATUS_CODE.SUCCESS, bookData, MESSAGE.fetch('Book')));
    } catch (err: any) {
      //logger.error(MESSAGE.errorLog('bookList', 'pControductroller', err))
      res.status(STATUS_CODE.BAD_REQUEST).json(failAction(STATUS_CODE.BAD_REQUEST, err.MESSAGE, MESSAGE.SOMETHING_WENT_WRONG));
    }
  }

  //Update store
  public static async updateBook(req: Request, res: Response) {
    try {
      const bookId = req.params.id;
      //const { name, address, email, password, contact } = req.body;
      const findStore = await BooksServices.getBookById(bookId);

      if (!findStore) {
        res.status(404).json(failAction(STATUS_CODE.SUCCESS, MESSAGE.notExist('Book')));
      }
      const data = await BooksServices.updateBook(bookId, req.body);

      //const data = await StoreServices.updateStore({id:req.params});
      if (data) {
        res.status(STATUS_CODE.SUCCESS).json(successAction(STATUS_CODE.SUCCESS, data, MESSAGE.update('Book')));
      }
    } catch (err: any) {
      console.log('err', err.MESSAGE);
      //logger.error(MESSAGE.errorLog('storeUpdate', 'storeController', err))
      res.status(STATUS_CODE.BAD_REQUEST).json(failAction(STATUS_CODE.BAD_REQUEST, err.MESSAGE, MESSAGE.SOMETHING_WENT_WRONG));
    }
  }

  //Delete Book
  public static async deleteBookById(req: Request, res: Response) {
    try {
      const data = await BooksServices.deleteBook(req);
      res.status(STATUS_CODE.SUCCESS).json(successAction(STATUS_CODE.SUCCESS, MESSAGE.delete('Book')));
    } catch (err: any) {
      //logger.error(MESSAGE.errorLog('bookDelete', 'productController', err))
      res.status(STATUS_CODE.BAD_REQUEST).json(failAction(STATUS_CODE.BAD_REQUEST, err.MESSAGE, MESSAGE.SOMETHING_WENT_WRONG));
    }
  }

  public static async uploadImage(req: Request, res: Response) {
    try {
      // console.log('hello');
      const data = await BooksServices.uploadImage(req.body, req.file!.path);
      if (data) {
        res.status(STATUS_CODE.SUCCESS).json(successAction(STATUS_CODE.SUCCESS, data, MESSAGE.upload('Image')));
      } else {
        res.status(STATUS_CODE.NOT_CREATED);
      }
    } catch (err: any) {
      // logger.error(message.errorLog('productAdd', 'productController', err))
      res.status(STATUS_CODE.BAD_REQUEST).json(failAction(STATUS_CODE.BAD_REQUEST, err.MESSAGE, MESSAGE.SOMETHING_WENT_WRONG));
    }
  }

  //Subscriber message
  public static async subscribeMessage(req: Request, res: Response) {
    try {
      const publisher = await Redis.createClient();
      const subscriber = await Redis.createClient();

      const channelName = 'productChannel';

      // Promisify the subscribe method to use async/await
      const subscribeAsync = (subscriber: Redis, channel: string) => {
        return new Promise((resolve, reject) => {
          subscriber.subscribe(channel, (err: any, channel: unknown) => {
            if (err) {
              reject(err);
            } else {
              resolve(channel);
            }
          });
        });
      };

      // Function to handle incoming messages
      subscriber.on('message', (channel, message) => {
        try {
          console.log(`Received ${message} from ${channel}`);
          return res.json({ channel: channel });
          // Process your message here
        } catch (error) {
          console.error('Error handling message:', error);
        }
      });

      // Start the subscription and handle any errors
      await (async () => {
        try {
          // Subscribe to the channel
          await subscribeAsync(subscriber, channelName);
          console.log(`Subscribed to ${channelName} channel`);

          // Publish a message
          publisher.publish(channelName, 'message');

          // Respond to the client
          console.log(`Message published to ${channelName}`);
        } catch (error) {
          console.error('Error subscribing to channel:', error);
          // Handle error response here
        }
      })();
    } catch (err) {
      console.error('Error:', err);
      res.status(400).json({ error: 'Something went wrong' });
    }
  }
}
