export default function storeDestination(actionContext, destination) {
  actionContext.dispatch('SetDestination', {
    ...destination,
    address: destination.address || destination.name
  });
}
