export default function storeDestination(actionContext, destination) {
  if (Object.keys(destination).length === 0) {
    actionContext.dispatch('SetDestination', destination);
    return;
  }

  actionContext.dispatch('SetDestination', {
    ...destination,
    address: destination.address || destination.name
  });
}
