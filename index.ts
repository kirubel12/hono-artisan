#!/usr/bin/env node
import { Command } from 'commander';
import { version } from './package.json';
import * as p from '@clack/prompts';
import { setTimeout } from 'node:timers/promises';
import color from 'picocolors';

const program = new Command();

program
  .name('hono-artisan')
  .description('CLI tool for Hono framework')
  .version(version);

async function createController(name: string) {
  const s = p.spinner();
  try {
    s.start('Creating controller');
    await setTimeout(1000);
    // TODO: Implement actual controller creation
    s.stop('Controller created successfully');
  } catch (error) {
    s.stop('Failed to create controller');
    process.exit(1);
  }
}

async function createMiddleware(name: string) {
  const s = p.spinner();
  try {
    s.start('Creating middleware');
    await setTimeout(1000);
    // TODO: Implement actual middleware creation
    s.stop('Middleware created successfully');
  } catch (error) {
    s.stop('Failed to create middleware');
    process.exit(1);
  }
}

async function createModel(name: string) {
  const s = p.spinner();
  try {
    s.start('Creating model');
    await setTimeout(1000);
    // TODO: Implement actual model creation
    s.stop('Model created successfully');
  } catch (error) {
    s.stop('Failed to create model');
    process.exit(1);
  }
}

program
  .command('make:model [name]')
  .description('Create a new model')
  .action(async (providedName) => {
    p.intro(`${color.bgCyan(color.black(' Hono Artisan '))}`);

    let name = providedName;
    if (!name) {
      name = await p.text({
        message: 'What is the name of your model?',
        placeholder: 'User',
        validate: (value) => {
          if (!value) return 'Model name is required';
        },
      });
    }

    const type = await p.select({
      message: 'What type of model would you like to create?',
      options: [
        { value: 'basic', label: 'Basic Model' },
        { value: 'schema', label: 'Schema Model (with validation)' },
        { value: 'relations', label: 'Relational Model (with relationships)' },
      ],
    });

    if (p.isCancel(type)) {
      p.cancel('Operation cancelled');
      process.exit(0);
    }

    await createModel(name as string);

    p.outro(`${color.green('✔')} Model created successfully!`);
  });

// Update the help command to include model information
program
  .command('help')
  .description('Display help information about Hono Artisan')
  .action(async () => {
    p.intro(`${color.bgCyan(color.black(' Hono Artisan Help '))}`);

    console.log('\n' + color.bold('Available Commands:') + '\n');

    // Controller Section
    console.log(color.cyan('➜') + color.bold(' make:controller') + color.dim(' [name]'));
    console.log(color.dim('  Create a new controller for your Hono application'));
    console.log(color.yellow('\n  Options:'));
    console.log(color.dim('  ├─ ') + color.green('Basic Controller') + color.dim(': Simple controller with basic routing'));
    console.log(color.dim('  ├─ ') + color.green('Resource Controller') + color.dim(': Full CRUD operations'));
    console.log(color.dim('  │  ') + color.dim('(index, show, create, update, delete)'));
    console.log(color.dim('  └─ ') + color.green('API Controller') + color.dim(': Specialized for API endpoints with JSON responses'));

    console.log(''); // Empty line for spacing

    // Model Section
    console.log(color.cyan('➜') + color.bold(' make:model') + color.dim(' [name]'));
    console.log(color.dim('  Create a new model for your application'));
    console.log(color.yellow('\n  Options:'));
    console.log(color.dim('  ├─ ') + color.green('Basic Model') + color.dim(': Simple model structure'));
    console.log(color.dim('  ├─ ') + color.green('Schema Model') + color.dim(': Model with data validation'));
    console.log(color.dim('  └─ ') + color.green('Relational Model') + color.dim(': Model with relationship definitions'));

    console.log(''); // Empty line for spacing

    // Middleware Section
    console.log(color.cyan('➜') + color.bold(' make:middleware') + color.dim(' [name]'));
    console.log(color.dim('  Create a new middleware for request/response handling'));
    console.log(color.yellow('\n  Examples:'));
    console.log(color.dim('  ├─ ') + color.green('AuthMiddleware') + color.dim(': Handle authentication'));
    console.log(color.dim('  ├─ ') + color.green('LoggerMiddleware') + color.dim(': Log requests'));
    console.log(color.dim('  └─ ') + color.green('CorsMiddleware') + color.dim(': Handle CORS policies'));

    console.log('\n' + color.bold('Usage Examples:'));
    console.log(color.dim('  $ ') + color.green('hono-artisan make:controller UserController'));
    console.log(color.dim('  $ ') + color.green('hono-artisan make:model User'));
    console.log(color.dim('  $ ') + color.green('hono-artisan make:middleware AuthMiddleware'));

    console.log(''); // Empty line for spacing
    p.outro(`Run ${color.bold(color.green('hono-artisan <command>'))} to execute a command`);
  });

program
  .command('make:controller [name]')
  .description('Create a new controller')
  .action(async (providedName) => {
    p.intro(`${color.bgCyan(color.black(' Hono Artisan '))}`);

    let name = providedName;
    if (!name) {
      name = await p.text({
        message: 'What is the name of your controller?',
        placeholder: 'UserController',
        validate: (value) => {
          if (!value) return 'Controller name is required';
          if (!value.endsWith('Controller')) return 'Controller name must end with "Controller"';
        },
      });
    }

    if (!name.endsWith('Controller')) {
      name = `${name}Controller`;
    }

    const type = await p.select({
      message: 'What type of controller would you like to create?',
      options: [
        { value: 'basic', label: 'Basic Controller' },
        { value: 'resource', label: 'Resource Controller (CRUD)' },
        { value: 'api', label: 'API Controller' },
      ],
    });

    if (p.isCancel(type)) {
      p.cancel('Operation cancelled');
      process.exit(0);
    }

    await createController(name as string);

    p.outro(`${color.green('✔')} Controller created successfully!`);
  });

program
  .command('make:middleware')
  .description('Create a new middleware')
  .action(async () => {
    p.intro(`${color.bgCyan(color.black(' Hono Artisan '))}`);

    const name = await p.text({
      message: 'What is the name of your middleware?',
      placeholder: 'AuthMiddleware',
      validate: (value) => {
        if (!value) return 'Middleware name is required';
        if (!value.endsWith('Middleware')) return 'Middleware name must end with "Middleware"';
      },
    });

    if (p.isCancel(name)) {
      p.cancel('Operation cancelled');
      process.exit(0);
    }

    await createMiddleware(name as string);

    p.outro(`${color.green('✔')} Middleware created successfully!`);
  });

program.parse();