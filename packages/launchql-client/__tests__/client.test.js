import mutations from '../__fixtures__/api/mutations.json';
import queries from '../__fixtures__/api/queries.json';
import metaObject from '../__fixtures__/api/meta-obj.json';
import { Client } from '../src';

describe('getMany', () => {
  it('should select only scalar fields by default', () => {
    const client = new Client({
      meta: metaObject,
      introspection: { ...queries, ...mutations }
    });

    const result = client.query('Action').getMany().print();

    expect(result._hash).toMatchSnapshot();
    expect(result._queryName).toMatchSnapshot();
    expect(
      /(ownerId)|(userActions)|(userActionResults)|(userActionItems)/.test(
        result._hash
      )
    ).toBe(false);
  });

  it('should whitelist selected fields', () => {
    const client = new Client({
      meta: metaObject,
      introspection: { ...queries, ...mutations }
    });

    const result = client
      .query('Action')
      .getMany({
        select: {
          id: true,
          name: true,
          photo: true,
          title: true,
          actionResults: {
            select: {
              id: true,
              actionId: true
            },
            variables: {
              first: 10,
              filter: {
                name: {
                  in: ['abc', 'def']
                },
                actionId: { equalTo: 'dc310161-7a42-4b93-6a56-9fa48adcad7e' }
              }
            }
          }
        }
      })
      .print();

    expect(result._hash).toMatchSnapshot();
    expect(result._queryName).toMatchSnapshot();
  });
});

it('getMany edges', () => {
  const client = new Client({
    meta: metaObject,
    introspection: { ...queries, ...mutations }
  });
  const result = client
    .query('Action')
    .edges(true)
    .getMany({
      select: {
        id: true,
        name: true,
        photo: true,
        title: true,
        actionResults: {
          select: {
            id: true,
            actionId: true
          },
          variables: {
            first: 10,
            before: null,
            filter: {
              name: {
                in: ['abc', 'def']
              },
              actionId: { equalTo: 'dc310161-7a42-4b93-6a56-9fa48adcad7e' }
            }
          }
        }
      }
    })
    .print();
  expect(result._hash).toMatchSnapshot();
  expect(result._queryName).toMatchSnapshot();
});

it('getOne', () => {
  const client = new Client({
    meta: metaObject,
    introspection: { ...queries, ...mutations }
  });
  const result = client
    .query('Action')
    .getOne({
      select: {
        id: true,
        name: true,
        photo: true,
        title: true,
        actionResults: {
          select: {
            id: true,
            actionId: true
          },
          variables: {
            first: 10,
            before: null,
            filter: {
              name: {
                in: ['abc', 'def']
              },
              actionId: { equalTo: 'dc310161-7a42-4b93-6a56-9fa48adcad7e' }
            }
          }
        }
      }
    })
    .print();
  expect(result._hash).toMatchSnapshot();
  expect(result._queryName).toMatchSnapshot();
});

it('getAll', () => {
  const client = new Client({
    meta: metaObject,
    introspection: { ...queries, ...mutations }
  });

  const result = client
    .query('Action')
    .all({
      select: {
        id: true,
        name: true,
        photo: true,
        title: true,
        actionResults: {
          select: {
            id: true,
            actionId: true
          },
          variables: {
            first: 10,
            before: null,
            filter: {
              name: {
                in: ['abc', 'def']
              },
              actionId: { equalTo: 'dc310161-7a42-4b93-6a56-9fa48adcad7e' }
            }
          }
        }
      }
    })
    .print();
  expect(result._hash).toMatchSnapshot();
  expect(result._queryName).toMatchSnapshot();
});

it('create', () => {
  const client = new Client({
    meta: metaObject,
    introspection: { ...queries, ...mutations }
  });
  const result = client
    .query('Action')
    .create({
      select: {
        id: true,
        name: true,
        photo: true,
        title: true
      }
    })
    .print();
  expect(client._hash).toMatchSnapshot();
  expect(client._queryName).toMatchSnapshot();
});

it('delete', () => {
  const client = new Client({
    meta: metaObject,
    introspection: { ...queries, ...mutations }
  });
  const result = client
    .query('Action')
    .delete({
      select: {
        id: true,
        name: true,
        photo: true,
        title: true
      }
    })
    .print();
  expect(result._hash).toMatchSnapshot();
  expect(result._queryName).toMatchSnapshot();
});

it('update', () => {
  const client = new Client({
    meta: metaObject,
    introspection: { ...queries, ...mutations }
  });
  const result = client
    .query('Action')
    .update({
      select: {
        id: true,
        name: true,
        photo: true,
        title: true
      }
    })
    .print();
  expect(result._hash).toMatchSnapshot();
  expect(result._queryName).toMatchSnapshot();
});
