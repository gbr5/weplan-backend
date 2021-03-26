import ContactPageLink from '@modules/contactPages/infra/typeorm/entities/ContactPageLink';

export function sortContactPageLink(
  links: ContactPageLink[],
): ContactPageLink[] {
  const sortedLinks = links.sort((a: ContactPageLink, b: ContactPageLink) => {
    if (a.position < b.position) {
      return -1;
    }
    if (a.position > b.position) {
      return 1;
    }
    return 0;
  });
  return sortedLinks;
}
