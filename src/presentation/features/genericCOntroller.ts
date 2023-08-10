import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { getAllItems, getItem, addItem, updateItem, deleteItem } from './data';

export class Routes {
  private app: FastifyInstance;

  constructor(app: FastifyInstance, options: FastifyPluginOptions) {
    this.app = app;
    this.setupRoutes();
  }

  private setupRoutes() {
    this.app.get('/items', this.getAllItems);
    this.app.get('/items/:id', this.getItem);
    this.app.post('/items', this.addItem);
    this.app.put('/items/:id', this.updateItem);
    this.app.delete('/items/:id', this.deleteItem);
  }

  private getAllItems = async (request, reply) => {
    const items = await getAllItems();
    reply.send(items);
  };

  private getItem = async (request, reply) => {
    const itemId = request.params.id;
    const item = await getItem(itemId);
    reply.send(item);
  };

  private addItem = async (request, reply) => {
    const newItem = request.body;
    const addedItem = await addItem(newItem);
    reply.send(addedItem);
  };

  private updateItem = async (request, reply) => {
    const itemId = request.params.id;
    const updatedItem = request.body;
    await updateItem(itemId, updatedItem);
    reply.send({ message: 'Item updated successfully' });
  };

  private deleteItem = async (request, reply) => {
    const itemId = request.params.id;
    await deleteItem(itemId);
    reply.send({ message: 'Item deleted successfully' });
  };
}
