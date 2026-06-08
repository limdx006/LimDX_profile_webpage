#!/usr/bin/env python3
"""
Markdown to Portfolio README Preview Converter
Usage: python md_to_readme.py <input.md> <output.html> ["Page Title"]
"""

import sys
import re

def md_to_html(md_content, title="README Preview", back_link="/"):
    """Convert markdown to styled HTML page matching the portfolio theme."""

    content = md_content

    # Extract and preserve raw HTML img tags (from GitHub paste)
    img_tags = re.findall(r'<img[^>]+>', content)
    placeholder_map = {}
    for i, tag in enumerate(img_tags):
        placeholder = f"___IMG_PLACEHOLDER_{i}___"
        placeholder_map[placeholder] = tag
        content = content.replace(tag, placeholder, 1)

    # Escape HTML
    content = content.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')

    # Restore placeholders
    for placeholder, tag in placeholder_map.items():
        content = content.replace(placeholder, tag)

    # Headers
    content = re.sub(r'^###### (.+)$', r'<h6>\1</h6>', content, flags=re.MULTILINE)
    content = re.sub(r'^##### (.+)$', r'<h5>\1</h5>', content, flags=re.MULTILINE)
    content = re.sub(r'^#### (.+)$', r'<h4>\1</h4>', content, flags=re.MULTILINE)
    content = re.sub(r'^### (.+)$', r'<h3>\1</h3>', content, flags=re.MULTILINE)
    content = re.sub(r'^## (.+)$', r'<h2>\1</h2>', content, flags=re.MULTILINE)
    content = re.sub(r'^# (.+)$', r'<h1>\1</h1>', content, flags=re.MULTILINE)

    # Bold and italic
    content = re.sub(r'\*\*\*(.+?)\*\*\*', r'<strong><em>\1</em></strong>', content)
    content = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', content)
    content = re.sub(r'\*(.+?)\*', r'<em>\1</em>', content)

    # Inline code
    content = re.sub(r'`(.+?)`', r'<code>\1</code>', content)

    # Links [text](url)
    content = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'<a href="\2" target="_blank">\1</a>', content)

    # Horizontal rules
    content = re.sub(r'^---+$', r'<hr>', content, flags=re.MULTILINE)

    # Table parser
    def parse_table(table_text):
        lines = table_text.strip().split('\n')
        if len(lines) < 2:
            return table_text
        sep_line = lines[1].strip()
        if not ('|' in sep_line and '-' in sep_line.replace(' ', '')):
            return table_text

        def split_row(row):
            row = row.strip()
            if row.startswith('|'):
                row = row[1:]
            if row.endswith('|'):
                row = row[:-1]
            return [c.strip() for c in row.split('|')]

        html = '<table>\n<thead>\n<tr>\n'
        for h in split_row(lines[0]):
            html += f'<th>{h}</th>\n'
        html += '</tr>\n</thead>\n<tbody>\n'

        for line in lines[2:]:
            cells = split_row(line)
            html += '<tr>\n'
            for cell in cells:
                html += f'<td>{cell}</td>\n'
            html += '</tr>\n'

        html += '</tbody>\n</table>'
        return html

    lines = content.split('\n')
    in_table = False
    table_lines = []
    result_lines = []

    for line in lines:
        stripped = line.strip()
        if '|' in stripped and not in_table:
            in_table = True
            table_lines = [line]
        elif '|' in stripped and in_table:
            table_lines.append(line)
        elif in_table:
            result_lines.append(parse_table('\n'.join(table_lines)))
            in_table = False
            table_lines = []
            if stripped:
                result_lines.append(line)
        else:
            result_lines.append(line)

    if in_table and table_lines:
        result_lines.append(parse_table('\n'.join(table_lines)))

    content = '\n'.join(result_lines)

    # Lists
    lines = content.split('\n')
    result = []
    in_ul = False

    for line in lines:
        stripped = line.lstrip()
        if stripped.startswith('- ') or stripped.startswith('* '):
            if not in_ul:
                result.append('<ul>')
                in_ul = True
            item_content = stripped[2:]
            result.append(f'<li>{item_content}</li>')
        else:
            if in_ul:
                result.append('</ul>')
                in_ul = False
            result.append(line)

    if in_ul:
        result.append('</ul>')

    content = '\n'.join(result)

    # Paragraphs
    lines = content.split('\n')
    result = []
    buffer = []

    for line in lines:
        stripped = line.strip()
        if not stripped:
            if buffer:
                result.append('<p>' + ' '.join(buffer) + '</p>')
                buffer = []
            result.append('')
        elif stripped.startswith('<') and stripped.endswith('>'):
            if buffer:
                result.append('<p>' + ' '.join(buffer) + '</p>')
                buffer = []
            result.append(line)
        else:
            buffer.append(line)

    if buffer:
        result.append('<p>' + ' '.join(buffer) + '</p>')

    content = '\n'.join(result)
    content = re.sub(r'\n{3,}', '\n\n', content)

    # Style raw img tags
    content = content.replace(
        '<img ', 
        '<img style="max-width:100%;border-radius:var(--radius-md);margin:1.5rem 0;border:1px solid var(--clr-border);" '
    )

    return f'''<!DOCTYPE html>
    
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  <link rel="stylesheet" href="/css/tokens.css">
  <link rel="stylesheet" href="/css/base.css">
  <link rel="stylesheet" href="/css/readme.css">
  <base href="/">
</head>

<body>
  <a href="{back_link}" class="back-link">← Back to Portfolio</a>

  {content}
</body>
</html>'''


if __name__ == '__main__':
    if len(sys.argv) < 3:
        print("Usage: python md_to_html.py <input.md> <output.html> [\"Page Title\"]")
        sys.exit(1)

    input_file = sys.argv[1]
    output_file = sys.argv[2]
    title = sys.argv[3] if len(sys.argv) > 3 else "README Preview"

    with open(input_file, 'r', encoding='utf-8') as f:
        md = f.read()

    html = md_to_html(md, title=title)

    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(html)

    print(f"Converted {input_file} -> {output_file}")