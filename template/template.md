<%# 
  README.md template (ejs syntax)
-%>

# Awesome project!

[![pipeline status](<%= projectUrl %>/badges/master/pipeline.svg)](<%= projectUrl %>/commits/master)

🌎 Translated

👇 **Table of contents:**

<!-- toc -->

## Get started

Clone this [repository](<%= repositoryUrl %>) and install via `npm install`

## Dependencies

<details>

<summary>Global</summary>

<%-
  await include('common/table.md', {
    options: [
      ['name', 'version'],
      ...(Object.entries(dependencies))
    ]
  })
%>

</details>

<details>

<summary>Dev</summary>

<%-
  await include('common/table.md', {
    options: [
      ['name', 'version'],
      ...(Object.entries(devDependencies))
    ]
  })
%>

</details>
