<h2 class="item1">How to use</h2>

<h5>
    There are several steps to use RD Flickr Gallery
</h5>

<h3>
    Get the script from GIT
</h3>

<p>
    Get the script from our public Repo:
    <a href="http://products.git.devoffice.com/coding-development/rd-flickr-gallery.git">Click</a>
</p>


<h3>
    Add the HTML markup
</h3>

<p>
    Default HTML markup is shown below
</p>

<code>
<pre>
&lt;!-- RD Flickr --&gt;
&lt;div class="flickr" data-flickr-id="47302490@N05"&gt;
  &lt;div data-type="flickr-item"&gt;&lt;
    &lt;img data-image_q="src" data-title="alt" src="images/_blank.png" alt=""/&gt;
    ...
  &lt;/div&gt;
&lt;/div&gt;
&lt;!-- END RD Flickr--&gt;
</pre>
</code>

<p>
    <strong>Attention:</strong> markup in given block bay be any, including elements of the grid, etc. It is only
                                necessary presence element with the attribute data-type="flickr-item".
</p>

<h3>
    Element HTML Markup
</h3>

<p>
    Data can be retrieved only in block with attribute data-type="flickr-item". For getting the data necessary to add
    the following attribute: <br/>
    <div style="text-align:center;">data-(data name)="target"</div> <br/>
    target - an attribute in which data will be recorded.
    If you specify a target value of "text", the data will be written into tag as plain text. You can write multiple
    values to the target, separating with comma. For example, you can use next markup to display images and date published:
</p>

<code>
<pre>
&lt;div data-type="flickr-item"&gt;
    &lt;img src="images/_blank.png" data-image_z="src" data-title="alt" alt=""/&gt;
    &lt;time data-dating="text" data-datetime="datetime"&gt;&lt;/time&gt;
    ...
&lt;/div&gt;
</pre>
</code>

<h4>List of attributes </h4>
<ul class="marked-list">
    <li>
        <dl class="inline-term">
            <dt>data-description</dt>
            <dd>photo description</dd>
        </dl>
    </li>
    <li>
        <dl class="inline-term">
            <dt>data-title</dt>
            <dd>photo title</dd>
        </dl>
    </li>
    <li>
        <dl class="inline-term">
            <dt>data-tags</dt>
            <dd>tags</dd>
        </dl>
    </li>
    <li>
        <dl class="inline-term">
            <dt>data-author</dt>
            <dd>author (with e-mail)</dd>
        </dl>
    </li>
    <li>
        <dl class="inline-term">
            <dt>data-author_name</dt>
            <dd>author (без e-mail)</dd>
        </dl>
    </li>
    <li>
        <dl class="inline-term">
            <dt>data-link</dt>
            <dd>Photo link</dd>
        </dl>
    </li>
    <li>
        <dl class="inline-term">
            <dt>data-dating</dt>
            <dd>date published</dd>
        </dl>
    </li>
    <li>
        <dl class="inline-term">
            <dt>data-datetime</dt>
            <dd>date published in special format "YY-MM-DD"</dd>
        </dl>
    </li>
</ul>

<p>
    <strong>Attention:</strong>
    Photo description may not be available in flickr.
</p>


<h3>
    Image HTML markup
</h3>

<p>
    For getting link to service image you need set attribute data-image_(image suffix)=”src”
</p>

<h4>List of suffixes:</h4>
<ul class="marked-list">
    <li>
        <dl class="inline-term">
            <dt>s</dt>
            <dd>75x75px</dd>
        </dl>
    </li>
    <li>
        <dl class="inline-term">
            <dt>s</dt>
            <dd>150x150px</dd>
        </dl>
    </li>
    <li>
        <dl class="inline-term">
            <dt>t</dt>
            <dd>100px on longest side</dd>
        </dl>
    </li>
    <li>
        <dl class="inline-term">
            <dt>m</dt>
            <dd>240px on longest side</dd>
        </dl>
    </li>
    <li>
        <dl class="inline-term">
            <dt>n</dt>
            <dd>320px on longest side</dd>
        </dl>
    </li>
    <li>
        <dl class="inline-term">
            <dt>-</dt>
            <dd>500px on longest side</dd>
        </dl>
    </li>
    <li>
        <dl class="inline-term">
            <dt>z</dt>
            <dd>640px on longest side</dd>
        </dl>
    </li>
    <li>
        <dl class="inline-term">
            <dt>c</dt>
            <dd>800px on longest side</dd>
        </dl>
    </li>
    <li>
        <dl class="inline-term">
            <dt>b</dt>
            <dd>1024px on longest side</dd>
        </dl>
    </li>
    <li>
        <dl class="inline-term">
            <dt>h</dt>
            <dd>1600px on longest side</dd>
        </dl>
    </li>
    <li>
        <dl class="inline-term">
            <dt>k</dt>
            <dd>2048px on longest side</dd>
        </dl>
    </li>
    <li>
        <dl class="inline-term">
            <dt>o</dt>
            <dd>original size</dd>
        </dl>
    </li>
</ul>

<p>
    <strong>Attention:</strong>
    some image sizes may not be available in flickr.
</p>



<h3>
    Include the script
</h3>

<p>
    Include the script on target page
</p>

<code>
<pre>
&lt;script src="js/jquery.rd-flickr-gallery.min.js"&gt;&lt;/script&gt;
</pre>
</code>


<h3>
    Initialize the script
</h3>

<p>
    Use this code for script initialization
</p>

<code>
<pre>
&lt;script&gt;
  $(document).ready(function () {
    o.RDFlickr({}); // Additional options
  });
&lt;/script&gt;
</pre>
</code>

