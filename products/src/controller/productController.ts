import { Request, Response } from 'express';
import { MESSAGE, STATUS_CODE, failAction, successAction } from '../utilis/messages/response';
import { BooksServices } from '../services/products.services';
import Redis from 'ioredis';
import logger from '../utilis/logger';
// const redisSubscriber = new Redis();

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
      logger.error(MESSAGE.errorLog('addProduct', 'productController', err));
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
      logger.error(MESSAGE.errorLog('getBookById', 'productController', err));
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
      logger.error(MESSAGE.errorLog('bookListing', 'productController', err));
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
      logger.error(MESSAGE.errorLog('updateBook', 'productController', err));
      res.status(STATUS_CODE.BAD_REQUEST).json(failAction(STATUS_CODE.BAD_REQUEST, err.MESSAGE, MESSAGE.SOMETHING_WENT_WRONG));
    }
  }

  //Delete Book
  public static async deleteBookById(req: Request, res: Response) {
    try {
      const data = await BooksServices.deleteBook(req);
      if (!data) {
        res.status(STATUS_CODE.SUCCESS).json(failAction(STATUS_CODE.NOT_FOUND, MESSAGE.notExist('Book')));
      }
      res.status(STATUS_CODE.SUCCESS).json(successAction(STATUS_CODE.SUCCESS, MESSAGE.delete('Book')));
    } catch (err: any) {
      logger.error(MESSAGE.errorLog('deleteBook', 'productController', err));
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
      logger.error(MESSAGE.errorLog('uploadBookImage', 'productController', err));
      res.status(STATUS_CODE.BAD_REQUEST).json(failAction(STATUS_CODE.BAD_REQUEST, err.MESSAGE, MESSAGE.SOMETHING_WENT_WRONG));
    }
  }

  //Subscriber message
  // public static async subscribeMessage(req: Request, res: Response) {
  //   try {
  //     const publisher = await Redis.createClient();
  //     const subscriber = await Redis.createClient();

  //     const channelName = 'storeChannel';

  //     // Promisify the subscribe method to use async/await
  //     const subscribeAsync = (subscriber: Redis, channel: string) => {
  //       return new Promise((resolve, reject) => {
  //         subscriber.subscribe(channel, (err: any, channel: unknown) => {
  //           if (err) {
  //             reject(err);
  //           } else {
  //             resolve(channel);
  //           }
  //         });
  //       });
  //     };

  //     // Function to handle incoming messages
  //     subscriber.on('message', (channel, message) => {
  //       try {
  //         console.log(`Received ${message} from ${channel}`);
  //         return res.json({ channel: channel });
  //       } catch (error) {
  //         console.error('Error handling message:', error);
  //       }
  //     });

  //     // Start the subscription and handle any errors
  //     await (async () => {
  //       try {
  //         // Subscribe to the channel
  //         await subscribeAsync(subscriber, channelName);
  //         console.log(`Subscribed to ${channelName} channel`);

  //         // Publish a message to productChannel
  //         publisher.publish(channelName, 'message');

  //         // Respond to the client
  //         console.log(`Message published by ${channelName}`);
  //       } catch (error) {
  //         console.error('Error subscribing to channel:', error);
  //         // Handle error response here
  //       }
  //     })();
  //   } catch (err) {
  //     console.error('Error:', err);
  //     res.status(400).json({ error: 'Something went wrong' });
  //   }
  // }

  public static async subscribeToStore(req: Request, res: Response) {
    const subscriber = new Redis();

    subscriber.subscribe('storeChannel', (err, count) => {
      if (err) {
        console.error('Error subscribing:', err);
        res.status(500).json({ success: false, error: 'Failed to subscribe to channel' });
        return;
      }
      console.log(`Subscribed to ${count} channel(s).`);
      res.status(200).json({ success: true, message: `Subscribed to ${count} channel(s)` });
    });

    subscriber.on('message', (channel, message) => {
      console.log(`Received message from channel ${channel}: ${message}`);

      try {
        const parsedMessage = JSON.parse(message);
        console.log('Parsed message:', parsedMessage);

        if (parsedMessage.action === 'update') {
          console.log('Performing update operation...');
        } else if (parsedMessage.action === 'delete') {
          console.log('Performing delete operation...');
        }

        res.status(200).json({ success: true, message: 'Message processed successfully' });
      } catch (err: any) {
        console.error('Error processing message:', err);
        logger.error(MESSAGE.errorLog('subscribeToStore', 'productController', err));
        res.status(500).json({ success: false, error: 'Failed to process message' });
      }
    });
  }
}
