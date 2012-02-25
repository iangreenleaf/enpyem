# Enpyem #

NPM utilities. For now, there's only one.

## Installation ##

    npm install -g enpyem

## Usage ##

**updateable** checks your `package.json` file and shows you a list of packages
that have newer versions available. Think of it like `npm outdated` for direct
dependencies, ignoring the version locks.

    cd my_node_proj
    enpyem updateable
