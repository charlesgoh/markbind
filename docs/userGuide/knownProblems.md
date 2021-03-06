<frontmatter>
  footer: userGuideFooter.md
  siteNav: userGuideSections.md
</frontmatter>

<include src="../common/header.md" />

<div class="website-content">

# Known problems

## Unwanted starting space in links and triggers

When you use links or triggers, you may encounter a situation where an unwanted space is being generated by MarkBind:

<tip-box>

**Markdown:**

`The`<br>
`[[link](https://example.com)].`

**What You Expected:**

<code>The [[link](https://example.com)].</code>

**What Was Generated by MarkBind (notice the additional space in front of the link):**

<code>The [ [link](https://example.com)].</code>

</tip-box>

In order to remove the unwanted space, you must wrap the link or trigger around with `<md>` tags.

<tip-box>

`The`<br>
`<md>[[link](https://example.com)]</md>.`

</tip-box>

</div>
