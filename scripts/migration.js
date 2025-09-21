const { argv, exit } = require('node:process');
const { spawn } = require('node:child_process');
const { resolve, join } = require('node:path');

const ACTION_TYPES = {
    CREATE: 'create',
    GENERATE: 'generate',
    RUN: 'run',
    REVERT: 'revert',
};

const DATA_SOURCE_PATH_FROM_ROOT_DIR = 'src/orm/datasource.ts';
const MIGRATIONS_PATH_FROM_ROOT_DIR = 'src/orm/migrations';

const ROOT_DIR = resolve(__dirname, '..');
const DATA_SOURCE_PATH = join(ROOT_DIR, DATA_SOURCE_PATH_FROM_ROOT_DIR);

const checkFileName = (name) => {
    if (!name) {
        console.error('Migration name is not specified');
        exit(1);
    }
};

const runTypeORMCliCommand = (action, fileName) => {
    const dataSourceArgs = ['-d', DATA_SOURCE_PATH];

    const args = [`migration:${action}`];

    if (action !== ACTION_TYPES.CREATE) {
        args.push(...dataSourceArgs);
    }

    if (fileName) {
        const migrationPath = join(ROOT_DIR, MIGRATIONS_PATH_FROM_ROOT_DIR, fileName);
        args.push(migrationPath);
    }

    const child = spawn('pnpm', ['run', 'typeorm', ...args], {
        stdio: 'inherit',
        shell: true,
    });

    child.on('exit', (code, signals) => {
        exit(code);
    });
};

const executeMigration = () => {
    const [action, fileName] = argv.slice(2);

    if (!action) {
        console.error('Migration action not specified');
        exit(1);
    }

    switch (action) {
        case ACTION_TYPES.CREATE:
        case ACTION_TYPES.GENERATE:
            checkFileName(fileName);
            runTypeORMCliCommand(action, fileName);
            break;

        case ACTION_TYPES.RUN:
        case ACTION_TYPES.REVERT:
            runTypeORMCliCommand(action);
            break;

        default:
            console.error(`Unsupported action type ${action}`);
            exit(1);
    }
};

executeMigration();
